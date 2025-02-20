require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const notificationRepo = require("../controllers/notification-repository.js");
const login_controller = require("../controllers/userProxy.js");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/upcoming", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await notificationRepo.getNotifications();
    if (response.result) {
      res.status(200).json(response.notifications);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

app.put("/changeStatus", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await notificationRepo.changeNotificationStatus(req.body.notificationId);
    if (response.result) {
      res.status(200).json(response.notifications);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

app.put("/postponeNotification", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await notificationRepo.postponeNotification(req.body.notificationId, new Date(req.body.newDate));
    if (response.result) {
      res.status(200).json(response.notifications);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});
module.exports = app;
