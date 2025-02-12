const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin", enum: ["admin", "client", "user"] },
  otpEnabled: { type: Boolean, default: false } // Add this flag to indicate OTP status
});

module.exports = mongoose.model("Admin", adminSchema);


