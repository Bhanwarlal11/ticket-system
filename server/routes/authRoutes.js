const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  googleLogin,
} = require("../controllers/authController"); // Importing controller functions
const { authenticateJWT } = require("../middlewares/auth.js");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for user logout
router.post("/logout", logoutUser);
router.get("/profile", authenticateJWT, getUserProfile);

router.post("/login/google", googleLogin);

// Protect routes that require authentication
// router.get("/protected", protectRoute, (req, res) => {
//   res.status(200).json({
//     message: "You have access to this protected route",
//     user: req.user,
//   });
// });

module.exports = router;
