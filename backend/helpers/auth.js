const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function authenticate(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload; // create a current user
    return next();
  } catch (err) {
    return next();
  }
}

module.exports = { authenticate };
