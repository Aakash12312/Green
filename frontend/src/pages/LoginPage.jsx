import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import "../styles/LoginPage.css";

const ecoFacts = [
  "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
  "Planting trees helps combat climate change by absorbing CO₂.",
  "Turning off the tap while brushing can save up to 8 gallons of water per day.",
  "Bamboo releases 35% more oxygen than trees of equivalent mass.",
  "LED bulbs use 75% less energy than incandescent lighting.",
  "Each ton of recycled paper saves 17 trees and 7,000 gallons of water.",
  "Composting reduces household waste by up to 30%.",
  "Electric vehicles emit 50% less CO₂ than gas-powered cars.",
  "Switching to reusable bottles can prevent 1,500 plastic bottles per person yearly.",
  "One mature tree can absorb 48 pounds of CO₂ annually.",
  "Unplugging idle devices can cut 10% off your electricity bill.",
  "Air-drying clothes saves 700 pounds of CO₂ per year.",
  "Public transportation reduces carbon emissions per person by 80%.",
  "Recycling glass reduces related air pollution by 20%.",
  "Walking or cycling short distances improves health and saves energy.",
  "Solar energy is the most abundant energy source on Earth.",
  "Producing recycled steel uses 74% less energy than making new steel.",
  "A leaky faucet can waste over 3,000 gallons of water a year.",
  "Meat production contributes to 15% of global greenhouse gas emissions.",
  "Buying local reduces the carbon footprint of transported goods.",
  "Ocean plants produce over 50% of the world’s oxygen.",
  "Every ton of recycled plastic saves 2,000 gallons of gasoline.",
  "Switching to cloth bags prevents thousands of plastic bags yearly.",
  "Turning off lights for one hour can power a city block for minutes.",
  "An acre of forest absorbs six tons of carbon dioxide each year.",
  "If everyone recycled newspapers, we could save 250 million trees a year.",
  "Carpooling reduces traffic congestion and CO₂ emissions.",
  "Green roofs reduce urban heat and improve air quality.",
  "Wind energy produces no greenhouse gas emissions.",
  "One person can save 13,000 gallons of water a year by taking shorter showers.",
];

const LoginPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ecoFact, setEcoFact] = useState("");
  const [showFact, setShowFact] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // Pick a random eco fact
      const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];
      setEcoFact(randomFact);
      setShowFact(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeFactAndRedirect = () => {
    setShowFact(false);
    navigate("/");
  };

  return (
    <div
      className={`login-page d-flex justify-content-center align-items-center ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <motion.div
        className="login-card shadow-lg p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
        }}
      >
        <div className="text-center mb-4">
          <FaLeaf
            className={`fs-1 ${theme === "dark" ? "text-success" : "text-primary"}`}
          />
          <h3 className="mt-2 fw-bold">GoGreen Quest</h3>
          <p className="text-muted">Welcome back, Eco Hero!</p>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-${theme === "dark" ? "success" : "primary"} w-100`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign up
            </Link>
          </small>
        </div>

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      {/* 🌱 Eco Fact Modal */}
      {showFact && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
              <div className="modal-header border-0">
                <h5 className="modal-title text-success">🌿 Eco Fact of the Day</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeFactAndRedirect}
                ></button>
              </div>
              <div className="modal-body fs-5">{ecoFact}</div>
              <div className="modal-footer border-0">
                <button
                  className={`btn btn-${theme === "dark" ? "success" : "primary"}`}
                  onClick={closeFactAndRedirect}
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
