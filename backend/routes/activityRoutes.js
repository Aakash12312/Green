import express from "express";
import mongoose from "mongoose";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Badge from "../models/Badge.js";

const router = express.Router();

// Add activity by user name
router.post("/", async (req, res) => {
    try {
        const { name, type, points, co2Saved } = req.body;
        if (!name || !type || points === undefined || co2Saved === undefined)
            return res.status(400).json({ message: "All fields required" });

        const user = await User.findOne({ name }).populate("badges");
        if (!user) return res.status(400).json({ message: "User not found" });

        const activity = await Activity.create({ user: user._id, type, points, co2Saved });

        user.points += points;

        const newBadges = [];
        const allBadges = await Badge.find();

        allBadges.forEach(badge => {
            const alreadyEarned = user.badges.some(b => new mongoose.Types.ObjectId(b._id || b).equals(badge._id));
            if (!alreadyEarned && user.points >= badge.threshold) {
                user.badges.push(badge._id);
                newBadges.push(badge);
            }
        });

        await user.save();

        // ✅ Populate badges after saving
        await user.populate("badges");

        res.status(201).json({
            message: "Activity added successfully",
            activity,
            newBadges: newBadges.map(b => ({ name: b.name, icon: b.icon, threshold: b.threshold })),
            allBadges: user.badges.map(b => ({ name: b.name, icon: b.icon, threshold: b.threshold }))
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get all activities of a user by name
router.post("/user", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({ message: "User not found" });

        const activities = await Activity.find({ user: user._id }).sort({ date: -1 });
        res.json({ activities, badges: user.badges });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
