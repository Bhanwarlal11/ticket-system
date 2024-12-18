const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true // Ensures the username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures the email is unique
    },
    password: {
      type: String,
      required: function () {
        return this.googleId === undefined;
      },
    },
    googleId: {
      type: String, 
      unique: true, // Ensure that Google IDs are unique
      sparse: true, // Allows this field to be optional for non-Google users
    },
    role: {
      type: String,
      enum: ["admin", "manager", "teamMember", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
// In your User.js schema
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
