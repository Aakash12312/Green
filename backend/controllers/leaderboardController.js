import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 }).limit(10);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
