const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const db = require("./models/index");
const usersRoutes = require("./routes/users");
require("./middleware/secure-crypt.js")();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//for security
app.use(helmet());

app.set("trust proxy", 1);
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId",
    resave: false,
    saveUninitialized: true,
  })
);

db.sequelize.sync().then(() => {
  console.log("synced db.");
});

app.use("/api/users", usersRoutes);

module.exports = app;
