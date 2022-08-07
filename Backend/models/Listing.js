const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredient: {
      type: String,
      required: true,
    },
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  { collection: "BurgerAssembly" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
