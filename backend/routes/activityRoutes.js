import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Badge from "../models/Badge.js";

const router = express.Router();

// Configure multer (memory storage, optional file)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add Activity Endpoint
router.post("/", upload.single("image"), async (req, res) => {
    try {
        let { name, type, points, co2Saved } = req.body;

        points = Number(points);
        co2Saved = Number(co2Saved);

        if (!name || !type || isNaN(points) || isNaN(co2Saved))
            return res.status(400).json({ message: "All fields required" });

        console.log(name, type, points, co2Saved);

        const user = await User.findOne({ name }).populate("badges");
        if (!user) return res.status(400).json({ message: "User not found" });

        // Create new Activity document
        const activityData = { user: user._id, type, points, co2Saved };
        if (req.file) {
            activityData.image = req.file.buffer;
            activityData.imageType = req.file.mimetype;
        }

        const activity = await Activity.create(activityData);

        // Update user points and badges
        user.points += points;

        // 🌿 Add calendar event
        user.calendar.push({
            activityType: type,
            pointsEarned: points,
            co2Saved,
            date: new Date(),
        });

        // Badge logic
        const allBadgesDocs = await Badge.find();
        const newBadges = [];

        allBadgesDocs.forEach((badge) => {
            const alreadyEarned = user.badges.some((b) =>
                new mongoose.Types.ObjectId(b._id || b).equals(badge._id)
            );
            if (!alreadyEarned && user.points >= badge.threshold) {
                user.badges.push(badge._id);
                newBadges.push(badge);
            }
        });

        await user.save();
        const populatedUser = await user.populate("badges");

        res.status(201).json({
            message: "Activity added successfully",
            activity,
            newBadges: newBadges.map((b) => ({
                name: b.name,
                icon: b.icon,
                threshold: b.threshold,
            })),
            allBadges: populatedUser.badges.map((b) => ({
                name: b.name,
                icon: b.icon,
                threshold: b.threshold,
            })),
            calendar: user.calendar, // return updated calendar too
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
