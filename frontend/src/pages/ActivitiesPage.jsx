// src/pages/ActivitiesPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import "../styles/ActivitiesPage.css";

const activityPoints = {
    "Recycled Trash": { points: 10, co2: 0.5, keywords: ["trash", "garbage", "recycle"] },
    "Planted Tree": { points: 50, co2: 20, keywords: ["tree", "plant", "nature"] },
    "Boarded Public Transport": { points: 15, co2: 1, keywords: ["bus", "train", "metro", "tram"] },
    "Saved Electricity": { points: 5, co2: 0.2, keywords: ["light", "electricity", "lamp"] },
    "Used Bicycle": { points: 20, co2: 2, keywords: ["bicycle", "bike", "cycling"] },
};
const IMAGGA_API_KEY = "acc_cf8bf8db4c1dddb";
const IMAGGA_API_SECRET = "227c5794c787cde07c04d26194b67c85";

const ActivitiesPage = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [activity, setActivity] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Function to check image against activity using Imagga
    const checkActivityImage = async (file, activity) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("https://api.imagga.com/v2/tags", {
                method: "POST",
                headers: {
                    Authorization: "Basic " + btoa(`${IMAGGA_API_KEY}:${IMAGGA_API_SECRET}`),
                },
                body: formData,
            });

            const data = await response.json();
            if (data.result && data.result.tags) {
                const tags = data.result.tags.map((tag) => tag.tag.en.toLowerCase());
                const keywords = activityPoints[activity].keywords.map(k => k.toLowerCase());

                // Check if any keyword matches a tag
                return keywords.some(keyword => tags.some(tag => tag.includes(keyword) || keyword.includes(tag)));
            }
        } catch (err) {
            console.error("Error checking image:", err);
        }

        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activity) {
            setMessage("Please select an activity!");
            return;
        }
        if (!file) {
            setMessage("Please upload an image!");
            return;
        }

        setLoading(true);
        setMessage("");

        // ✅ Verify image before submission
        const isValidImage = await checkActivityImage(file, activity);
        if (!isValidImage) {
            setMessage("The uploaded image does not match the selected activity!");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", user.name || "Unknown");
        formData.append("type", activity);
        formData.append("points", activityPoints[activity].points);
        formData.append("co2Saved", activityPoints[activity].co2);
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/api/activities", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add activity");

            setMessage("Activity submitted successfully!");
            setActivity("");
            setFile(null);
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`activities-page ${theme === "dark" ? "activities-dark" : "activities-light"}`}>
            <motion.section
                className="activities-container text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="activities-card p-4"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <FaLeaf className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"}`} />
                    <h2 className="fw-bold mb-3">Submit Your Eco Activity</h2>
                    <p className="mb-4">Earn points and save CO₂ by logging your eco-friendly activities!</p>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label className="form-label">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        <div className="mb-3 text-start">
                            <label className="form-label">Select Activity</label>
                            <select
                                className="form-select"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                            >
                                <option value="">-- Choose an activity --</option>
                                {Object.keys(activityPoints).map((act) => (
                                    <option key={act} value={act}>{act}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-lg w-100 btn-${theme === "dark" ? "success" : "primary"}`}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Activity"}
                        </button>
                    </form>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default ActivitiesPage;
