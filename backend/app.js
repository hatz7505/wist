/** Express app for wista. */

const express = require("express");
const ExpressError = require("./helpers/expressError");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const User = require("./models/user");
const { authenticate } = require("./helpers/auth");
const userRoutes = require("./routes/users");

const app = express();

app.use(authenticate);
app.use(express.json());

// add logging system
app.use(morgan("tiny"));

app.use("/users", userRoutes);

app.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let user = await User.getByUsername(username);
    if (user) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
      }
    }
    // throw error if login credentials are not valid
    throw new ExpressError("Invalid user/password", 400);
  } catch (err) {
    // next the error to error handling middleware
    next(err);
  }
});

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // set error status to 500 if not on the error body
  res.status(err.status || 500);

  // return error status and error message
  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
