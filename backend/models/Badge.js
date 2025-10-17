import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    threshold: { type: Number, required: true }, // points required to unlock
    icon: String, // optional emoji or image
});

export default mongoose.model("Badge", badgeSchema);
