const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name Is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name Is Required"],
    },
    contact: {
      type: String,
      required: [true, "Contact Is Required"],
      maxLength: [10, "Contact Should Not Exceed More Than 10 Numbers"],
      minLength: [10, "Contact Should Have Atleast 10 Number"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    city: {
      type: String,
      required: [true, "City Name Is Required"],
    },
    addresses: { type: [Schema.Types.Mixed] },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please Fill A Valid Email Address",
      ],
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password Should Not Exceed More Than 15 Characters"],
      minLength: [6, "Password Should Have Atleast 6 Characters"],
      required: [true, "Password Is Required"],
      //   match : []
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    resetPasswordExpire: Date,
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1695802060198-c735209f8e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",
      },
    },

    order: [{ type: mongoose.Schema.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);

userModel.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userModel.methods.getJwtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("user", userModel);

module.exports = User;
