const book = require("../Schemas/book-Schema");

const getAllBooks = (req, res) => {
  book
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getBookById = (req, res) => {
  book
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getBookBySeller = (req, res) => {
  book
    .find({ sid: req.params.sid })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const addBook = (req, res) => {
  let newbook = new book({
    id: req.body.id,
    sid: req.body.sid,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    page: req.body.pages,
    cover: req.body.cover,
    sname: req.body.sname,
  });
  newbook
    .save()
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const updateBook = (req, res) => {
  let updatebook = {};
  if (req.body.name) {
    updatebook.name = req.body.name;
  }
  if (req.body.price) {
    updatebook.price = req.body.price;
  }
  if (req.body.description) {
    updatebook.description = req.body.description;
  }
  if (req.body.pages) {
    updatebook.page = req.body.pages;
  }
  if (req.body.cover) {
    updatebook.cover = req.body.cover;
  }

  book
    .updateOne({ id: req.params.id }, { $set: updatebook })
    .then(() => {
      res.status(200).send(updatebook);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const deleteBook = (req, res) => {
  book
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const bookSell = async (req, res) => {
  let ibook = 0;
  const name = req.body.buyer;
  const quantity = req.body.quantity;

  await book
    .findOne({ id: req.params.id })
    .then((book) => {
      ibook = book;
    })
    .catch((err) => {
      console.log(err);
    });

  let buid = ibook.buyerid;
  let buquantity = ibook.buyerquantity;

  let updateBook = {};
  let flag = true;

  let names = ibook.buyerid;
  let quan = ibook.buyerquantity;

  if (names === undefined && quan === undefined) {
    (names = ""), (quan = "");
  } else {
    names = names.split(",");
    quan = quan.split(",");
  }

  for (let i = 0; i < names.length; i++) {
    if (names[i] === name) {
      flag = false;
      quan[i] = (Number(quantity) + Number(quan[i])).toString();
    }
  }
  if (flag) {
    names = names + name.toString() + ",";
    quan = quan + quantity.toString() + ",";
  } else {
    names = names + "";
    quan = quan + "";
  }

  updateBook.selling = ibook.selling + 1 * quantity;
  updateBook.buyerid = names;
  updateBook.buyerquantity = quan;

  book
    .updateOne({ id: req.params.id }, { $set: updateBook })
    .then((updatedBook) => {
      res.status(200).send(updatedBook);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookBySeller,
  addBook,
  updateBook,
  deleteBook,
  bookSell,
};
