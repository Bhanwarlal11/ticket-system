const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const RiskLevel = ["Low", "Medium", "High"]; // Define risk levels

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const newCategory = new Category({
      name,
    });

    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");

    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a subcategory and assign a risk level
const createSubCategory = async (req, res) => {
  const { name, categoryId, riskLevel } = req.body;

  // Validate risk level
  if (!RiskLevel.includes(riskLevel)) {
    return res.status(400).json({
      success: false,
      message: "Invalid risk level. Choose from Low, Medium, High.",
    });
  }

  try {
    // Check if category exists
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Check if subcategory already exists
    const existingSubCategory = await SubCategory.findOne({
      name,
      category: categoryId,
    });

    if (existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory already exists" });
    }

    // Create new subcategory
    const newSubCategory = new SubCategory({
      name,
      category: categoryId,
      riskLevel,
    });

    // Save subcategory and update category
    await newSubCategory.save();
    category.subcategories.push(newSubCategory._id);
    await category.save();

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      newSubCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all subcategories for a specific category
const getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, subcategories: category.subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategoriesByCategory,
};
