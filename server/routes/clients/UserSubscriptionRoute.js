const express = require("express");
const router = express.Router();
const UserSubscription = require("../../models/clients/userSubscription");

// 🔹 Get all user subscriptions
router.get("/", async (req, res) => {
    try {
        const subscriptions = await UserSubscription.find().populate("userId", "name email").populate("planId");
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 🔹 Get a single user subscription
router.get("/:id", async (req, res) => {
    try {
        const subscription = await UserSubscription.findById(req.params.id).populate("userId", "name email").populate("planId");
        if (!subscription) return res.status(404).json({ message: "Subscription not found" });

        res.json(subscription);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 🔹 Create a new user subscription
router.post("/", async (req, res) => {
    try {
        const { userId, planId, endDate } = req.body;

        const newSubscription = new UserSubscription({ userId, planId, endDate });
        await newSubscription.save();

        res.status(201).json({ message: "User subscription created", subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 🔹 Delete a user subscription
router.delete("/:id", async (req, res) => {
    try {
        const deletedSubscription = await UserSubscription.findByIdAndDelete(req.params.id);
        if (!deletedSubscription) return res.status(404).json({ message: "Subscription not found" });

        res.json({ message: "Subscription deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
