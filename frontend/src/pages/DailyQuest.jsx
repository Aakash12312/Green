// src/pages/DailyQuest.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import "../styles/DailyQuest.css";

const allActivities = [
  { name: "Recycled Trash", id: 1 },
  { name: "Planted Tree", id: 2 },
  { name: "Boarded Public Transport", id: 3 },
  { name: "Saved Electricity", id: 4 },
  { name: "Used Bicycle", id: 5 },
];

const DailyQuest = () => {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [bonusGiven, setBonusGiven] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ Pick 3 random daily quests — once per day
  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = JSON.parse(localStorage.getItem("dailyQuestsData") || "{}");

    if (storedData.date === today && storedData.quests) {
      setDailyQuests(storedData.quests);
    } else {
      const shuffled = [...allActivities].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setDailyQuests(selected);
      localStorage.setItem("dailyQuestsData", JSON.stringify({ date: today, quests: selected }));
    }
  }, []);

  // ✅ Load completed activities from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("completedActivities") || "[]");
    setCompleted(stored);
  }, []);

  // ✅ Listen for changes to localStorage (real-time update)
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("completedActivities") || "[]");
      setCompleted(updated);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Auto-award bonus when all 3 are done
  useEffect(() => {
    if (dailyQuests.length === 3) {
      const completedToday = dailyQuests.filter((q) => completed.includes(q.name));
      if (completedToday.length === 3 && !bonusGiven) {
        awardBonusPoints();
        setBonusGiven(true);
      }
    }
  }, [completed, dailyQuests]);

  const awardBonusPoints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bonus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          bonusPoints: 100,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("🎉 Bonus 100 points added to your account!");
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error awarding bonus:", err);
    }
  };

  const isCompleted = (quest) => completed.includes(quest.name);

  return (
    <div className={`daily-quest-page ${theme === "dark" ? "daily-dark" : "daily-light"}`}>
      <motion.div
        className="quest-container text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <FaLeaf className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"}`} />
        <h2 className="fw-bold mb-3">Daily Eco Quests</h2>
        <p className="mb-4">Complete today’s 3 eco-friendly actions to earn bonus points!</p>

        <ul className="list-group mb-4">
          {dailyQuests.map((quest) => (
            <li
              key={quest.id}
              className={`list-group-item d-flex align-items-center ${
                isCompleted(quest) ? "completed-quest" : ""
              }`}
            >
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={isCompleted(quest)}
                readOnly
              />
              <span>{quest.name}</span>
            </li>
          ))}
        </ul>

        {dailyQuests.length > 0 && (
          <>
            {dailyQuests.filter((q) => completed.includes(q.name)).length < 3 ? (
              <p
                className={`mt-3 fw-semibold ${
                  theme === "dark" ? "text-white" : "text-muted"
                }`}
              >
                ✅ Complete all 3 to unlock your daily bonus!
              </p>
            ) : (
              <motion.p
                className="mt-3 text-success fw-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                🎉 You completed all daily quests! Bonus awarded.
              </motion.p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DailyQuest;
