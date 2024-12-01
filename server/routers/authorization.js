require("dotenv").config();
const express = require("express");
const app = express();
const login_controller = require("../controllers/userProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/authorize", (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller.serveMyInfo(req, res);
  });
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email: email }).then(async (user) => {
    if (!user) {
      return res.send({ status: "User does not exist!" });
    }
    const token = await login_controller.token_issue(user);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.SERVICE_MAIL,
      to: email,
      subject: "Reset your password",
      text: `${process.env.REACT_APP_BACKEND_URL}/auth/new-password/${user._id}/${token.accessToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json("Success");
      }
    });
  });
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const check = await tokenManager.tokenChecker(token);
  if (!check.result) {
    return res.status(200).json("Error with token")
  } else {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        login_controller.editUser(id, { password: hash });
        res.status(200).json("Success");
      })
      .catch((err) => res.send({ status: err }));
  }
});


module.exports = app;
