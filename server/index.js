const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const { connectToDb } = require("./database/db");
const authRouter = require("./routers/authorization");
const loginRouter = require("./routers/logInRouter");
const expensesRouter = require('./routers/expensesRouter');
const clientRouter = require('./routers/client');
const sessionRouter = require("./routers/session");
const notificationRouter = require("./routers/notifications");
const statisticsRouter = require('./routers/statistics');
// const userProxy = require('./controllers/userProxy');

const allowedOrigins = [
  "http://localhost:3456",
  "http://localhost:3000",
  'http://localhost:5173',
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

app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use('/expenses', expensesRouter);
app.use('/clients', clientRouter);
app.use("/notifications", notificationRouter);
app.use("/session", sessionRouter);
app.use('/stats', statisticsRouter);

const port = 5443;

const path = require("path");
__dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

connectToDb(async (err) => {
  if (err) {
    console.log("Sth went wrong with the server");
  } else {
    // userProxy.createUser({body: { gmail: 'mcl-admin@gmail.com', password: '123456', role: 'admin', name: 'Selda', surname: 'Tafciu' }}, {})
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
});