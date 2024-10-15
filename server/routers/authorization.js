require("dotenv").config();
const express = require("express");
const app = express();
const login_controller = require("../controllers/userProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/authorize", (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller.serveMyInfo(req, res);
  });
});

module.exports = app;
