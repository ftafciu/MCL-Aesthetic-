const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const { connectToDb } = require("./database/db");

const allowedOrigins = [
  "http://localhost:3456",
  "http://localhost:3000",
  "postman://app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const port = 5443;

connectToDb(async (err) => {
  if (err) {
    console.log("Sth went wrong with the server");
  } else {
    // userProxy.createUser({body: { gmail: 'acifliku6@gmail.com', password: '123456', role: 'admin', name: 'Aurela', surname: 'Kalemi' }}, {})
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
});