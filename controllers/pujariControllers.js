const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Pujari = require("../models/pujariModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodeMailer");
const { sendToken } = require("../utils/sendToken");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");

exports.homePage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Home Page" });
});

exports.currentPujari = catchAsyncErrors(async (req, res, next) => {
  const pujari = await Pujari.findById(req.id).exec();
  res.json(pujari);
});

exports.pujariSignup = catchAsyncErrors(async (req, res, next) => {
  const pujari = await new Pujari(req.body).save();
  sendToken(pujari, 201, res);
});

exports.pujariSignin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const pujari = await Pujari.findOne({ email: email })
    .select("+password")
    .exec();
  if (!pujari) {
    return next(new ErrorHandler("Pujari Not Found With This Email Address"));
  }

  const isMatch = await pujari.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials"));
  }
  sendToken(pujari, 201, res);
});

exports.pujariSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully Singed Out!" });
});

exports.pujariSendMail = catchAsyncErrors(async (req, res, next) => {
  const pujari = await Pujari.findOne({ email: req.body.email }).exec();
  if (!pujari) {
    return next(new ErrorHandler("Pujari Not Found With This Email Address"));
  }
  // const url = `${req.protocol}://${req.get("host")}/pujari/forget-link/${
  //   pujari._id
  //   }`;

  const url = Math.floor(Math.random() * 9000 + 1000);

  sendMail(req, res, next, url);
  pujari.resetPasswordToken = url;
  await pujari.save();

  res.json({ message: "Mail Sent successfully Check Your Inbox" });
});

exports.pujariForgetLink = catchAsyncErrors(async (req, res, next) => {
  const pujari = await Pujari.findOne({ email: req.body.email }).exec();
  if (!pujari) {
    return next(new ErrorHandler("Pujari Not Found With This Email Address"));
  }
  if (pujari.resetPasswordToken == req.body.otp) {
    pujari.resetPasswordToken == "";
    pujari.password = req.body.password;
    await pujari.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try Again", 404)
    );
  }
  res.status(200).json({ message: "Password Has Been Successfully Changed" });
});

exports.pujariResetPassword = catchAsyncErrors(async (req, res, next) => {
  const pujari = await Pujari.findById(req.id).exec();
  pujari.password = req.body.password;
  await pujari.save();
  sendToken(pujari, 201, res);
});

exports.pujariUpdate = catchAsyncErrors(async (req, res, next) => {
  await Pujari.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Pujari Updated Successfully",
  });
});

exports.pujariAvtar = catchAsyncErrors(async (req, res, next) => {
  const pujari = await Pujari.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `pujari-profile-${Date.now}${path.extname(
    file.name
  )}`;
  if (pujari.avatar.fileId !== "") {
    await imageKit.deleteFile(pujari.avatar.fileId);
  }
  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  pujari.avatar = { fileId, url };
  await pujari.save();
  res.status(200).json({ success: true, message: "Profile Updated" });
});

