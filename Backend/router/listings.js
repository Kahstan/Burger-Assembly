require("dotenv").config();

const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

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
      totalPrice: req.body.totalPrice,
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
    const allListings = await Listing.find();
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
  const listingData = await Listing.findOne({ name: req.body.name });
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        id: req.body.id || listingData.id,
        name: req.body.name || listingData.name,
        image: req.body.image || listingData.image,
        price: req.body.price || listingData.price,
        description: req.body.description || listingData.description,
        totalPrice: req.body.totalPrice || listingData.totalPrice,
        cartCount: req.body.cartCount || listingData.cartCount,
      },
    },
    { new: true }
  );
  res.json(newListingData);
});

// ADD CART COUNT
router.patch("/addToCart", async (req, res) => {
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    { $inc: { cartCount: +1 } }
  );
  res.json(newListingData);
  console.log(newListingData);
});

// MINUS CART COUNT
router.patch("/minusToCart", async (req, res) => {
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    { $inc: { cartCount: -1 } }
  );
  res.json(newListingData);
  console.log(newListingData);
});

// DELETE LISTING //couldn't think of a way to use this
router.delete("/delete", async (req, res) => {
  const newListingData = await Listing.findOneAndUpdate(
    { name: req.body.name },
    { $set: { cartCount: 0 } }
  );
  res.json(newListingData);
  console.log(newListingData);
});

//stripe payment
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
