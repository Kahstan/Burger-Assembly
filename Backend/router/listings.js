require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

//stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// CREATE LISTING
router.put("/create", async (req, res) => {
  try {
    const createdListing = await Listing.create({
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
    });

    console.log("created listing:  ", createdListing);
    res.json({ status: "ok", message: "listing created" });
  } catch (error) {
    console.log("PUT /create", error); // on server
    res.status(400).json({
      status: "error",
      message: "failed: listing could not be created",
    }); // sent to client
  }
});

// DISPLAY ALL LISTINGS
router.get("/displayAll", async (req, res) => {
  try {
    const allListings = await Listing.find(); // this filters what information we want to send to the front-end (sensitive) **
    res.json(allListings);
  } catch (error) {
    console.log(`GET /displayAll ${error}`);
    res
      .status(400)
      .json({ status: "error", message: "failed: cannot display listings" });
  }
});

// UPDATE LISTING
router.patch("/edit", async (req, res) => {
  // update ANY listing as admin

  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
      },
    },
    { new: true }
  );
  res.json(newListingData);
});

// ADD CART COUNT
router.patch("/addToCart", async (req, res) => {
  // both admin and users can update listing favourite count
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    { $inc: { cartCount: +1 } }
  );
  res.json(newListingData);
  console.log(newListingData);
});

// MINUS CART COUNT
router.patch("/minusToCart", async (req, res) => {
  // both admin and users can update listing favourite count
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    { $inc: { cartCount: -1 } }
  );
  res.json(newListingData);
  console.log(newListingData);
});

// DELETE LISTING
router.delete("/delete", async (req, res) => {
  const deleteListing = await Listing.deleteOne({ name: req.body.name });
  res.json(deleteListing);
});

//stripe payment
//test data

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.priceInCents * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "https://giphy.com/embed/G96zgIcQn1L2xpmdxi/video",
      cancel_url: "https://giphy.com/embed/y7YHCpOwuYcLio0BP1/video",
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
