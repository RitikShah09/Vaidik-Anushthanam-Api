const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Pujari = require("../models/pujariModel");
const User = require("../models/userModel");
const Puja = require("../models/pujaModel");

const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodeMailer");
const { sendToken } = require("../utils/sendToken");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");
const { response } = require("express");

exports.homePage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Home Page" });
});

exports.currentAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  res.status(200).json(user);
});

exports.allUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const allUsers = await User.find().exec();
  res.status(200).json({ allUsers });
});

exports.allPujari = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const allPujari = await Pujari.find().exec();
  res.status(200).json({ allPujari });
});

exports.allPuja = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const allPuja = await Puja.find().exec();
  res.status(200).json({ allPuja });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const deleteUser = await User.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `User Deleted ${deleteUser.firstName}` });
});

exports.deletePujari = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const deletePujari = await Pujari.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `Pujari Deleted ${deletePujari.firstName}` });
});

exports.createPuja = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const puja = await Puja.create(req.body).exec();
  res.status(200).json({ message: `Puja Created Successfully`, puja });
});

exports.updatePuja = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const puja = await Puja.findByIdAndUpdate(req.params.id, req.body).exec();
  // console.log(puja);
  res.status(200).json({ message: `Puja Updated Successfully`, puja });
});

exports.singlePuja = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const puja = await Puja.findById(req.params.id).exec();
  if (!puja) {
    return next(
      new ErrorHandler(
        "Puja Not Found",
        404
      )
    );
  }
  res.status(200).json(puja);
});

exports.deletePuja = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const deletePuja = await Puja.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `Puja Deleted ${deletePuja.title}` });
});
