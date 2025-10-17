import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/leaderboard
router.get("/", async (req, res) => {
  try {
    // Fetch top 10 users sorted by points descending
    const users = await User.find()
      .sort({ points: -1 })
      .limit(10) // only top 10
      .select("name points") // only needed fields
      .lean();

    res.json({ topUsers: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
