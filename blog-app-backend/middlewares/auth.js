const User = require("../models/user");
const errorHandler = require("../middlewares/errorHandler");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const checkAuth = async (req, res) => {
  const token = req.headers.token;
  console.log("token: ", token);

  if (!token) {
    return errorHandler(res, 401, "Please login first");
  }

  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  console.log("decoded: ", decoded);

  return await User.findById(decoded._id);
};

module.exports = checkAuth;
