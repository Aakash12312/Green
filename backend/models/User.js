import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // we'll store hashed password later
    points: { type: Number, default: 0 },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
