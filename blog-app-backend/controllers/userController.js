const connectDB = require("../config/connectDb");
const errorHandler = require("../middlewares/errorHandler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/index");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    return errorHandler(res, 400, "Fill all the fields");
  }

  try {
    await connectDB();
    let user = await User.findOne({ email });

    console.log("user: ", user);
    if (user) {
      return errorHandler(res, 400, "This email is already used");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign({ _id: user._id, name: user.name }, JWT_SECRET_KEY, {expiresIn: "5h"});

    res.status(200).json({
      token,
      user,
      success: true,
      msg: "user register successfully",
    });
  } catch (err) {
    console.log("err: ", err);
    return errorHandler(res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandler(res, 400, "Fill all the fields");
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(res, 404, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorHandler(res, 404, "Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id, name: user.name }, JWT_SECRET_KEY, {expiresIn: "5h"});

    res.status(200).json({
      token,
      user,
      success: true,
      msg: "user loggedin successfully",
    });
  } catch (err) {
    console.log("err: ", err);
    return errorHandler(res);
  }
};

module.exports = { register, login};
