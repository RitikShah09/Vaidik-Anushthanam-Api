const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodeMailer");
const { sendToken } = require("../utils/sendToken");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");

exports.homePage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Home Page" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  res.json(user);
});

exports.userSignup = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  sendToken(user, 201, res);
});

exports.userSignin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password").exec();
  if (!user) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials"));
  }
  sendToken(user, 201, res);
});

exports.userSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully Singed Out!" });
});

exports.userSendMail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }
  // const url = `${req.protocol}://${req.get("host")}/user/forget-link/${
  //   user._id
  //   }`;

  const url = Math.floor(Math.random() * 9000 + 1000);

  sendMail(req, res, next, url);
  user.resetPasswordToken = url;
  await user.save();

  res.json({ message: "Mail Sent successfully Check Your Inbox" });
});

exports.userForgetLink = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }
  if (user.resetPasswordToken == req.body.otp) {
    user.resetPasswordToken == "";
    user.password = req.body.password;
    await user.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try Again", 404)
    );
  }
  res.status(200).json({ message: "Password Has Been Successfully Changed" });
});

exports.userResetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  user.password = req.body.password;
  await user.save();
  sendToken(user, 201, res);
});

exports.userUpdate = catchAsyncErrors(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
  });
});

exports.userAvtar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `user-profile-${Date.now}${path.extname(
    file.name
  )}`;
  if (user.avatar.fileId !== "") {
    await imageKit.deleteFile(user.avatar.fileId);
  }
  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  user.avatar = { fileId, url };
  await user.save();
  res.status(200).json({ success: true, message: "Profile Updated" });
});

