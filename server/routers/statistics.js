require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const statisticsRepo = require("../controllers/statistics-repository.js");
const login_controller = require("../controllers/userProxy.js");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/expenses", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await statisticsRepo.getMonthlyExpenses();
    if (response.result) {
      res.status(200).json(response.expenses);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

app.get("/sessions", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await statisticsRepo.getMonthlySessions();
    if (response.result) {
      res.status(200).json(response.sessions);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

app.post("/time-range-profits", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await statisticsRepo.getTimeRangeProfits(
      req.body.startDate,
      req.body.endDate
    );
    if (response.result) {
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

app.post("/time-range-expenses", (req, res) => {
  login_controller.authorize(req, res, async () => {
    const response = await statisticsRepo.getTimeRangeExpenses(
      req.body.startDate,
      req.body.endDate
    );
    if (response.result) {
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: response.message });
    }
  });
});

module.exports = app;
