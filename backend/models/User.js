import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
    activityType: { type: String, required: true },
    pointsEarned: { type: Number, required: true },
    co2Saved: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        points: { type: Number, default: 0 },
        badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
        calendar: [calendarEventSchema], // 🌿 new field added here
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
