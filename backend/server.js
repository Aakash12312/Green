import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🌱 Gamified Carbon Tracker API is running");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
