const express = require("express");
const {
  deleteCartItem,
  updateCartItem,
  addCartItem,
  getLastCartItem,
  getCartItems,
  getCartItemsById,
} = require("../Controllers/cartController");
const { checkAuthenticate } = require("../Middleware/authorizeAccess");
const router = express.Router();

router.route("/showCart").get(checkAuthenticate, getCartItems);
router.route("/showCart/:id").get(checkAuthenticate, getCartItemsById);
router.route("/getCartId").get(checkAuthenticate, getLastCartItem);
router.route("/addToCart/:uid/:bid").post(checkAuthenticate, addCartItem);
router.route("/updateCartQuantity/:cid").put(checkAuthenticate, updateCartItem);
router.route("/deleteCart/:uid/:bid").delete(checkAuthenticate, deleteCartItem);

module.exports = router;
