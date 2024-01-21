const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Category = require("../models/category");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");


exports.allCategories = catchAsyncErrors(async (req, res, next) => {
  const allCategory = await Category.find().exec();
  res.status(200).json({ allCategory });
});

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(new ErrorHandler("Please Login With Admin Account!", 404));
  }
  const category = await Category.create(req.body);
  res
    .status(200)
    .json({ message: `New Category Created Successfully`, category });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({ message: `category Updated Successfully`, category });
});


exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  if (user.admin !== true) {
    return next(
      new ErrorHandler(
        "Please Login With Admin Account To Acccess The Resource",
        404
      )
    );
  }
  const deletedCategory = await Category.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({ message: `Category Deleted ${deletedCategory}` });
});
