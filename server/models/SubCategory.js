const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
