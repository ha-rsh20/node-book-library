require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { connectToDb };
