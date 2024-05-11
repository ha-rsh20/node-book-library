const express = require("express");
const {
  deleteCartItem,
  updateCartItem,
  addCartItem,
  getLastCartItem,
  getCartItems,
  getCartItemsById,
} = require("../Controllers/cartController");
const router = express.Router();

router.route("/showCart").get(getCartItems);
router.route("/showCart/:id").get(getCartItemsById);
router.route("/getCartId").get(getLastCartItem);
router.route("/addToCart/:uid/:bid").post(addCartItem);
router.route("/updateCartQuantity/:cid").put(updateCartItem);
router.route("/deleteCart/:uid/:bid").delete(deleteCartItem);

module.exports = router;
