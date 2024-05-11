const express = require("express");
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const router = express.Router();

router.route("/showAllUsers").get(getAllUsers);
router.route("/showUser/:id").get(getUserById);
router.route("/addUser").post(addUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

module.exports = router;
