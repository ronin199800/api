const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("./../models/user");

async function isLoggined(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("access denied");
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded._id);
    req.user = user;
  } catch (err) {
    res.status(400).send("invalid token");
  }
  next();
}
async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) res.status(403).send("access denied");
  next();
}
module.exports = {
  isLoggined,
  isAdmin,
};
