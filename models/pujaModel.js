const mongoose = require("mongoose");

const pujaModel = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    pujari: { type: mongoose.Schema.ObjectId, ref: "pujari" },
    title: String,
    pujaType: { type: String, enum: ["Offline", "Online"] },
    prizing: Number,
    descripions: String,
    location: String,
    mandir: String,
    photo: {
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
  },
  { timestamps: true }
);

const Puja = mongoose.model("puja", pujaModel);

module.exports = Puja;
