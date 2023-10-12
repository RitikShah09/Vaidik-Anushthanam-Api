const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderModel = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    puja: { type: mongoose.Schema.ObjectId, ref: "puja", required: true },
    totalAmount: { type: Number },
    paymentMethod: {
      type: String,
      required: true,
      enum: {
        values: ["Online", "Cash"],
        message: "Enum Validator Failed For Payment Methods",
      },
    },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "pending" },
    Address: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderModel);

module.exports = Order;
