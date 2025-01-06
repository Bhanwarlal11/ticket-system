const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwt.js");
const admin = require("../config/firebase.js");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id, newUser.role);

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    console.log("token", token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  try {
    // Check if the user exists based on email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
console.log(isMatch);

    // Generate JWT token
    const token = generateToken(user._id, user.role);
    // console.log(email);
    console.log(token);
    

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    console.log("token is generated with login");

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  res.clearCookie("token"); // Clear the token from the cookie
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    // Find the user by their ID (from the decoded token)
    const user = await User.findById(req.user.id).select("-password"); // Exclude the password field

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Function to handle Google login
const googleLogin = async (req, res) => {
  const { idToken } = req.body; // ID token sent from frontend (Google OAuth token)

  if (!idToken) {
    return res
      .status(400)
      .json({ success: false, message: "No ID token provided" });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Check if the user already exists in the database
    let user = await User.findOne({ googleId: decodedToken.sub });

    if (!user) {
      // If user doesn't exist, create a new user in the database
      user = new User({
        email: decodedToken.email,
        name: decodedToken.name,
        role: "teamMember",
        googleId: decodedToken.sub,
      });

      await user.save(); // Save the new user to the database
    }

    // Generate a JWT token
    const token = generateToken(user._id, user.role);

    // Set the token in a cookie (HTTP-only, sameSite 'lax', etc.)
    res.cookie("token", token, {
      httpOnly: false,
      secure: false, // Set to 'true' if you are using HTTPS in production
      sameSite: "lax",
      maxAge: 3600000, // 1 hour expiry
    });

    // Send response to frontend
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  googleLogin,
};
