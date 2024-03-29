const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login To Access The Resources", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  next();
});

exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login!", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  const user = await User.findById(id).exec();
  if (user.admin !== true) {
    return next(new ErrorHandler("Please Login With Admin Account!", 401));
  }
  next();
});
