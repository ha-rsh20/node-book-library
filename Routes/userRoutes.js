const express = require("express");
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const { login, authenticateToken } = require("../Controllers/loginController");
const { register } = require("../Controllers/registerController");
const { sendEmail, verifyOTP } = require("../Controllers/emailController");
const { resetPassword } = require("../Controllers/passwordResetController");
const {
  authorizeAdmin,
  checkAuthenticate,
} = require("../Middleware/authorizeAccess");
const router = express.Router();

router
  .route("/showAllUsers")
  .get(authenticateToken, authorizeAdmin, getAllUsers);
router
  .route("/showUser/:id")
  .get(authenticateToken, checkAuthenticate, getUserById);
router.route("/addUser").post(authenticateToken, authorizeAdmin, addUser);
router
  .route("/updateUser/:id")
  .put(authenticateToken, checkAuthenticate, updateUser);
router
  .route("/deleteUser/:id")
  .delete(authenticateToken, authorizeAdmin, deleteUser);

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/sendMail/:mail").get(sendEmail);
router.route("/sendMail/:mail/:reset").get(sendEmail);
router.route("/verifyOTP").post(verifyOTP);
router.route("/password/reset").put(resetPassword);

module.exports = router;
