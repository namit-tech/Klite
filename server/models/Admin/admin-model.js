const mongoose = require("mongoose");
const { db1 } = require("../../database/db");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin", enum: ["admin", "client", "user"] },
  otpEnabled: { type: Boolean, default: false } // Add this flag to indicate OTP status
});
const Admin = db1.model("AdminLogin", adminSchema);

module.exports = Admin;


