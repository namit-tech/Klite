const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    role: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
    },
    password: { 
      type: String, 
      required: true, 
      minlength: 6
    },
    mobileNumber: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number."]
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);