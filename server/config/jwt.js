// config/jwt.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Generate JWT token
const generateToken = (userId, role) => {  
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // Expiry time from .env
  });
};

module.exports = { generateToken };
