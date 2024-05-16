const cart = require("../Schemas/cart-Schema");

const getCartItems = (req, res) => {
  cart
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getCartItemsById = (req, res) => {
  cart
    .find({ userid: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getLastCartItem = (req, res) => {
  cart
    .find()
    .then((data) => {
      let arr = data;
      let n = data.length - 1;
      res.status(200).send(arr[n]);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const addCartItem = async (req, res) => {
  let cartItem;
  await cart
    .find()
    .then((data) => {
      cartItem = data;
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  let cartId = cartItem[cartItem.length - 1].cid + 1;
  let newcart = new cart({
    userid: req.params.uid,
    bookid: req.params.bid,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    page: req.body.page,
    cid: cartId,
    quantity: 1,
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
};

const updateCartItem = (req, res) => {
  let updateCartBook = {};
  if (req.body.quantity != undefined) {
    updateCartBook.quantity = req.body.quantity;
  }

  cart
    .updateOne({ cid: req.params.cid }, { $set: updateCartBook })
    .then(() => {
      res.status(200).send(updateCartBook);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCartItem = (req, res) => {
  cart
    .deleteOne({ userid: req.params.uid } && { bookid: req.params.bid })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

module.exports = {
  getCartItems,
  getCartItemsById,
  getLastCartItem,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
