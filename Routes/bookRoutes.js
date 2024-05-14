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
  authorizeAdmin,
  authorizeBuyer,
  authorizeSeller,
} = require("../Middleware/authorizeAccess");
const router = express.Router();

router.route("/showAllBooks").get(getAllBooks);
router.route("/showBook/:id").get(authorizeSeller, getBookById);
router.route("/showBooksBySeller/:sid").get(authorizeSeller, getBookBySeller);
router.route("/addBook").post(authorizeSeller, addBook);
router.route("/updateBook/:id").put(authorizeSeller, updateBook);
router.route("/deleteBook/:id").delete(authorizeSeller, deleteBook);
router.route("/bookSell/:id/:cid").delete(authorizeSeller, bookSell);

module.exports = router;
