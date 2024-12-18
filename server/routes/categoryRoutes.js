const express = require('express');
const router = express.Router();
// const { protectRoute } = require('../controllers/authController');
const {authenticateJWT}  = require('../middlewares/auth.js')
const {createCategory,
getCategories,
createSubCategory,
getSubCategoriesByCategory} = require('../controllers/categoryController');

// Category Routes



// Route to create a new category
router.post('/create', authenticateJWT, createCategory);

// Route to get all categories
router.get('/', authenticateJWT, getCategories);

// Subcategory Routes

// Route to create a new subcategory
router.post('/subcategory/create', authenticateJWT, createSubCategory);

// Route to get all subcategories for a specific category
router.get('/:categoryId/subcategories', authenticateJWT, getSubCategoriesByCategory);

module.exports = router;
