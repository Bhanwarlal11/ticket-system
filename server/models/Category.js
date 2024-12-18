const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
  }],
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
