const { users, tokenMapUser } = require("../Controllers/loginController");

const authorizeAdmin = (req, res, next) => {
  const userEmail = tokenMapUser.get(req.body.token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

const authorizeSeller = (req, res, next) => {
  const userEmail = tokenMapUser.get(req.body.token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Seller" || user[0]?.role === "Admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

const authorizeBuyer = (req, res, next) => {
  const userEmail = tokenMapUser.get(req.body.token);
  const user = users.filter((user) => user.email === userEmail);
  if (user[0]?.role === "Buyer" || user[0]?.role === "Admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

const checkAuthenticate = (req, res, next) => {
  const userEmail = tokenMapUser.get(req.body.token);
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
