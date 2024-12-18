const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const connectDB = require("./config/db");
const { escalationJob } = require("./jobs/escalationJob.js");

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

escalationJob();

// Import routes

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/solutions", solutionRoutes);

// Error handler middleware
app.use(errorHandler);

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
