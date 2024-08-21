const User = require("../models/user");
const errorHandler = require("../middlewares/errorHandler");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const checkAuth = async (req, res) => {
  const cookie = req.headers.cookie;
  console.log("cookie: ", cookie);

  if (!cookie) {
    return errorHandler(res, 401, "Please login first");
  }
  
  const token = cookie.split("=")[1];
  console.log("token: ", token);

  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  console.log("decoded: ", decoded);

  return await User.findById(decoded._id);
};

module.exports = checkAuth;
