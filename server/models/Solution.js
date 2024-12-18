const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    solutionText: {
      type: String,
      required: true, // Make sure the solution text is required
    },
    providedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Provided by is optional, but can be made required later
    },
  },
  {
    timestamps: true,
  }
);

const Solution = mongoose.model("Solution", solutionSchema);
module.exports = Solution;
