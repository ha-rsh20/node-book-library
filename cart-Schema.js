const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  bookid: {
    type: Number,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
