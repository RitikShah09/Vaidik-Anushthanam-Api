const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const Puja = require("../models/pujaModel");

const ErrorHandler = require("../utils/errorHandler");

exports.createOffer = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const puja = await Puja.findByIdAndUpdate(
    req.params.id,
    ...req.body,
    (offers.isOffer = true)
  ).exec();
  res.status(200).json({ message: `Offer Created Successfully`, puja });
});

exports.deleteOffer = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const puja = await Puja.findByIdAndUpdate(
    req.params.id,
    ...req.body,
    (offers.isOffer = false)
  ).exec();
  res.status(200).json({ message: `Offer Deleted Successfully`, puja });
});

exports.offerPuja = catchAsyncErrors(async (req, res, next) => {
  const puja = await Puja.find({
    offers: { $elemMatch: { isOffer: true } },
  }).exec();
  res.status(200).json({ puja });
});

exports.allPuja = catchAsyncErrors(async (req, res, next) => {
  const allPuja = await Puja.find().exec();
  res.status(200).json({ allPuja });
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
  const puja = await Puja.create(req.body);
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
  res.status(200).json({ message: `Puja Updated Successfully`, puja });
});

exports.singlePuja = catchAsyncErrors(async (req, res, next) => {
  const puja = await Puja.findById(req.params.id).exec();
  if (!puja) {
    return next(new ErrorHandler("Puja Not Found", 404));
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
