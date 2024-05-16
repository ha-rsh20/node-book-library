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
const { authenticateToken } = require("../Controllers/loginController");
const router = express.Router();

router
  .route("/showCart")
  .get(authenticateToken, checkAuthenticate, getCartItems);
router
  .route("/showCart/:id")
  .get(authenticateToken, checkAuthenticate, getCartItemsById);
router
  .route("/getCartId")
  .get(authenticateToken, checkAuthenticate, getLastCartItem);
router
  .route("/addToCart/:uid/:bid")
  .post(authenticateToken, checkAuthenticate, addCartItem);
router
  .route("/updateCartQuantity/:cid")
  .put(authenticateToken, checkAuthenticate, updateCartItem);
router
  .route("/deleteCart/:uid/:bid")
  .delete(authenticateToken, checkAuthenticate, deleteCartItem);

module.exports = router;
