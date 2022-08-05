const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    ingredient: {
      type: String,
    },
  },
  { collection: "BurgerAssembly" }
);

const Listing = mongoose.model("BurgerAssembly", ListingSchema);

module.exports = Listing;
