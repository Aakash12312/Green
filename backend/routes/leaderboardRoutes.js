import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/leaderboard
router.get("/", async (req, res) => {
    try {
        // Fetch all users sorted by points descending
        const users = await User.find()
            .sort({ points: -1 })
            .populate("badges"); // populate badge info

        // Map users to return only relevant info
        const leaderboard = users.map(u => ({
            name: u.name,
            points: u.points,
            badges: u.badges.map(b => ({
                name: b.name,
                icon: b.icon,
                threshold: b.threshold
            }))
        }));

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
