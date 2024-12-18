const express = require('express');
const router = express.Router();
// const { protectRoute } = require('../controllers/authController');
const {authenticateJWT}  = require('../middlewares/auth.js')
const solutionController = require('../controllers/solutionController');

// Route to create a new solution
router.post('/create', authenticateJWT, solutionController.createSolution);

// Route to get all solutions for a specific subcategory
router.get('/subcategory/:subCategoryId', authenticateJWT, solutionController.getSolutionsBySubCategory);

// Route to get a specific solution by its ID
router.get('/:solutionId', authenticateJWT, solutionController.getSolutionById);

// Route to update a solution
router.put('/:solutionId', authenticateJWT, solutionController.updateSolution);

// Route to delete a solution
router.delete('/:solutionId', authenticateJWT, solutionController.deleteSolution);




module.exports = router;
