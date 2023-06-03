const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const book = require("./Schemas/book-Schema");
const user = require("./Schemas/user-Schema");
const cart = require("./Schemas/cart-Schema");

mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => console.log("Connection Established!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/app/showAllBooks", (req, res) => {
  book
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showAllUsers", (req, res) => {
  user
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showCart", (req, res) => {
  cart
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showBook/:id", (req, res) => {
  book
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showUser/:id", (req, res) => {
  user
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showCart/:id", (req, res) => {
  cart
    .find({ userid: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addBook", (req, res) => {
  let newbook = new book({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
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
});

app.post("/app/addUser", (req, res) => {
  let newuser = new user({
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  newuser
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addToCart/:uid/:bid", (req, res) => {
  let newcart = new cart({
    userid: req.params.uid,
    bookid: req.params.bid,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  newcart
    .save()
    .then((cart) => {
      res.status(201).send(cart);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateBook/:id", (req, res) => {
  let updatebook = {};
  if (req.body.name) {
    updatebook.name = req.body.name;
  }
  if (req.body.price) {
    updatebook.price = req.body.price;
  }
  if (req.body.email) {
    updatebook.description = req.body.description;
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
});

app.put("/app/updateUser/:id", (req, res) => {
  let updateuser = {};
  if (req.body.firstname) {
    updateuser.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    updateuser.lastname = req.body.lastname;
  }
  if (req.body.email) {
    updateuser.email = req.body.email;
  }
  if (req.body.role) {
    updateuser.role = req.body.role;
  }
  if (req.body.password) {
    updateuser.password = req.body.password;
  }

  user
    .updateOne({ id: req.params.id }, { $set: update })
    .then(() => {
      res.status(200).send(updateuser);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteBook/:id", (req, res) => {
  book
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteUser/:id", (req, res) => {
  user
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteCart/:uid/:bid", (req, res) => {
  cart
    .deleteOne({ userid: req.params.uid } && { bookid: req.params.bid })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.listen(4000, () => console.log("Listening on port 4000..."));
