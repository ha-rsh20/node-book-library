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
const router = express.Router();

router.route("/showAllBooks").get(getAllBooks);
router.route("/showBook/:id").get(getBookById);
router.route("/showBooksBySeller/:sid").get(getBookBySeller);
router.route("/addBook").post(addBook);
router.route("/updateBook/:id").put(updateBook);
router.route("/deleteBook/:id").delete(deleteBook);
router.route("/bookSell/:id/:cid").delete(bookSell);

module.exports = router;
