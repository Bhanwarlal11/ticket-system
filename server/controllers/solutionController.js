const Solution = require("../models/Solution");
const SubCategory = require("../models/SubCategory");

// Create a new solution
const createSolution = async (req, res) => {
  const { subCategoryId, solutionText } = req.body;

  try {
    // Check if the subcategory exists
    const subCategoryExists = await SubCategory.findById(subCategoryId);
    if (!subCategoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    // Check if a solution with the same subCategoryId already exists
    const solutionExists = await Solution.findOne({ subCategoryId });
    if (solutionExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Solution for this subcategory already exists",
        });
    }

    // Create the new solution
    const newSolution = new Solution({
      subCategoryId,
      solutionText,
    });

    // Save the new solution
    await newSolution.save();

    res.status(201).json({
      success: true,
      message: "Solution created successfully",
      solution: newSolution,
    });
  } catch (error) {
    console.error("Error creating solution:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all solutions for a specific subcategory
const getSolutionsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    // Find solutions by subcategory
    const solutions = await Solution.find({ subCategory: subCategoryId }).sort({
      createdAt: -1,
    }); // Sort by newest first

    if (solutions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No solutions found for this subcategory",
      });
    }

    res.json({ success: true, solutions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get a specific solution by its ID
const getSolutionById = async (req, res) => {
  const { solutionId } = req.params;

  try {
    // Find the solution by ID
    const solution = await Solution.findById(solutionId);

    if (!solution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }

    res.json({ success: true, solution });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update a solution
const updateSolution = async (req, res) => {
  const { solutionId } = req.params;
  const { solutionText } = req.body;

  try {
    // Check if the solution exists
    const solution = await Solution.findById(solutionId);

    if (!solution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }

    // Update the solution text if provided
    if (solutionText) solution.solutionText = solutionText;

    await solution.save();
    res.json({
      success: true,
      message: "Solution updated successfully",
      solution,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a solution
const deleteSolution = async (req, res) => {
  const { solutionId } = req.params;

  try {
    const solution = await Solution.findById(solutionId);

    if (!solution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }

    await solution.deleteOne();
    res.json({ success: true, message: "Solution deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createSolution,
  getSolutionsBySubCategory,
  getSolutionById,
  updateSolution,
  deleteSolution,
};
