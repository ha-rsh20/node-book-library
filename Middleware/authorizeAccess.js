const { users, tokenMapUser } = require("../Controllers/loginController");

const authorizeAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userEmail = tokenMapUser.get(token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

const authorizeSeller = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userEmail = tokenMapUser.get(token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Seller" || user[0]?.role === "Admin") {
    next();
  } else {
    console.log("Un-Authorized!");
    res.sendStatus(401);
  }
};

const authorizeBuyer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userEmail = tokenMapUser.get(token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Buyer" || user[0]?.role === "Admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

const checkAuthenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userEmail = tokenMapUser.get(token);
  if (userEmail) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authorizeAdmin,
  authorizeSeller,
  authorizeBuyer,
  checkAuthenticate,
};
