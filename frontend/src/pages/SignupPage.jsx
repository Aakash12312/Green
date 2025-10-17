import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`login-page d-flex justify-content-center align-items-center ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <motion.div
        className="signup-card shadow-lg p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
        }}
      >
        <div className="text-center mb-4">
          <FaLeaf
            className={`fs-1 ${theme === "dark" ? "text-success" : "text-primary"}`}
          />
          <h3 className="mt-2 fw-bold">Join GoGreen Quest</h3>
          <p className="text-muted">Create your eco-friendly account 🌍</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-${theme === "dark" ? "success" : "primary"} w-100`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </small>
        </div>

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
