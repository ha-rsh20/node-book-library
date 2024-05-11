const express = require("express");
const cors = require("cors");
const con = require("./dbconnect");
const BookRoute = require("./Routes/bookRoutes");
const CartRoute = require("./Routes/cartRoutes");
const UserRoute = require("./Routes/userRoutes");
require("dotenv").config();

con.connectToDb();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/"],
  })
);

app.use("/book", BookRoute);
app.use("/cart", CartRoute);
app.use("/user", UserRoute);

app.listen(4000, () => console.log("Server Started..."));
