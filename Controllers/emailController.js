const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const user = require("../Schemas/user-Schema");
const otpGenerator = require("./generateOTP");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

let otp;

const sendEmail = expressAsyncHandler(async (req, res) => {
  const mail = process.env.SMTP_MAIL;
  const mail_to = req.params.mail;
  const reset = req.params.reset;
  otp = otpGenerator();

  var mailOptions = {
    from: mail,
    to: mail_to,
    subject:
      reset === undefined
        ? "OTP for email authentication"
        : "OTP to reset password",
    text: `Your OTP is ${otp}`,
  };

  if (reset !== undefined) {
    user
      .findOne({ email: req.params.mail })
      .then((data) => {
        if (data) {
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(500).send();
            } else {
              res.status(200).send();
            }
          });
        } else {
          res.status(204).send();
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  }
});

const verifyOTP = (req, res) => {
  if (req.body.otp === otp) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

module.exports = { sendEmail, verifyOTP };
