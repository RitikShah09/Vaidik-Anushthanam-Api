const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("category", categoryModel);

module.exports = Category;
