const mongoose = require("mongoose");
const { db2 } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // Corrected from 'fullname'
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number."]
    },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    industryType: { type: String },
    selectedPlan: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    role: { type: String, default: "User" }, // Default role set
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const User = db2.model("User", userSchema);

module.exports = User;
