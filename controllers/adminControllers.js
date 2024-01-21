const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Pujari = require("../models/pujariModel");
const Puja = require("../models/pujaModel");

const User = require("../models/userModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");

exports.currentAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  res.status(200).json(user);
});

exports.allOrder = catchAsyncErrors(async (req, res, next) => {
  const allOrder = await Order.find().exec();
  res.status(200).json(allOrder);
});

exports.allUser = catchAsyncErrors(async (req, res, next) => {
  const allUsers = await User.find().exec();
  res.status(200).json({ allUsers });
});

exports.allPujari = catchAsyncErrors(async (req, res, next) => {
  const allPujari = await Pujari.find().exec();
  res.status(200).json({ allPujari });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `User Deleted ${deleteUser.firstName}` });
});

exports.deletePujari = catchAsyncErrors(async (req, res, next) => {
  const deletePujari = await Pujari.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `Pujari Deleted ${deletePujari.firstName}` });
});
