import mongoose from "mongoose";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Badge from "../models/Badge.js";

export const addActivity = async (req, res) => {
    try {
        const { name, type, points, co2Saved } = req.body;

        if (!name || !type || points === undefined || co2Saved === undefined)
            return res.status(400).json({ message: "All fields required" });

        const user = await User.findOne({ name }).populate("badges");
        if (!user) return res.status(400).json({ message: "User not found" });

        const activity = await Activity.create({ user: user._id, type, points, co2Saved });

        user.points += points;

        const allBadgesDocs = await Badge.find();
        const newBadges = [];

        allBadgesDocs.forEach(badge => {
            const alreadyEarned = user.badges.some(b => new mongoose.Types.ObjectId(b._id || b).equals(badge._id));
            if (!alreadyEarned && user.points >= badge.threshold) {
                user.badges.push(badge._id);
                newBadges.push(badge);
            }
        });

        await user.save();

        // ✅ Correctly populate badges after saving
        const populatedUser = await user.populate("badges");

        res.status(201).json({
            message: "Activity added successfully",
            activity,
            newBadges: newBadges.map(b => ({ name: b.name, icon: b.icon, threshold: b.threshold })),
            allBadges: populatedUser.badges.map(b => ({
                name: b.name,
                icon: b.icon,
                threshold: b.threshold
            }))
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getUserActivities = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const activities = await Activity.find({ user: user._id }).sort({ date: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
