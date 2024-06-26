const user = require("../Schemas/user-Schema");

const getAllUsers = (req, res) => {
  user
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getUserById = (req, res) => {
  user
    .findOne({ id: req.params.id })
    .then((data) => {
      let user = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        role: data.role,
      };
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

const addUser = (req, res) => {
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
};

const updateUser = async (req, res) => {
  let user;
  await user
    .findOne({ id: req.params.id })
    .then((data) => {
      user = data;
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

  if (user.password === req.body.password) {
    let updateuser = {};
    if (req.body.firstname != undefined) {
      updateuser.firstname = req.body.firstname;
    }
    if (req.body.lastname != undefined) {
      updateuser.lastname = req.body.lastname;
    }
    if (req.body.email != undefined) {
      updateuser.email = req.body.email;
    }
    if (req.body.role != undefined) {
      updateuser.role = req.body.role;
    }
    user
      .updateOne({ id: req.params.id }, { $set: updateuser })
      .then((updatedUser) => {
        res.status(200).send(updatedUser);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  } else {
    res.sendStatus(500);
  }
};

const deleteUser = (req, res) => {
  user
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
