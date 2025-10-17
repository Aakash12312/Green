import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            points: user.points,
            badges: user.badges
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
