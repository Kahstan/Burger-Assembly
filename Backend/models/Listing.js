const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    name: {
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
    description: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  { collection: "BurgerAssembly" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
