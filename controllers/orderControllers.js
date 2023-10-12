const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  const order = {
    totalAmount: req.body.totalAmount,
    paymentMethod: req.body.paymentMethod,
    Address: req.body.Address,
    puja: req.params.id,
    user: req.id,
  };
  const newOrder = await Order.create(order);
  user.order.push(newOrder._id);
  await user.save();
  res.status(200).json({ message: "Successfully Ordered", newOrder });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const order = await Order.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(order);
});
