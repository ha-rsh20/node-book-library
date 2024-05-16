const express = require("express");
const {
  getAllBooks,
  getBookById,
  getBookBySeller,
  addBook,
  updateBook,
  deleteBook,
  bookSell,
} = require("../Controllers/bookController");
const {
  authorizeSeller,
  checkAuthenticate,
} = require("../Middleware/authorizeAccess");
const { authenticateToken } = require("../Controllers/loginController");
const router = express.Router();

router.route("/showAllBooks").get(getAllBooks);
router
  .route("/showBook/:id")
  .get(authenticateToken, authorizeSeller, getBookById);
router
  .route("/showBooksBySeller/:sid")
  .get(authenticateToken, authorizeSeller, getBookBySeller);
router.route("/addBook").post(authenticateToken, authorizeSeller, addBook);
router
  .route("/updateBook/:id")
  .put(authenticateToken, authorizeSeller, updateBook);
router
  .route("/deleteBook/:id")
  .delete(authenticateToken, authorizeSeller, deleteBook);
router
  .route("/bookSell/:id/:cid")
  .delete(authenticateToken, checkAuthenticate, bookSell);

module.exports = router;
