import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/leaderboard
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
            .sort({ points: -1 })
            .limit(10)
            .populate("badges");

        const leaderboard = users.map(u => ({
            name: u.name,
            points: u.points,
            badges: u.badges.map(b => ({ name: b.name, icon: b.icon }))
        }));

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
