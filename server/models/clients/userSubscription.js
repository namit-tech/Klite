const mongoose = require("mongoose");
const { db2 } = require("../../database/db");

const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
});

const UserSubscription = db2.model("UserSubscription", userSubscriptionSchema);
module.exports = UserSubscription;
