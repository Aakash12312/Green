import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  return (
    <div
      className={`login-page d-flex justify-content-center align-items-center ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
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
            className={`fs-1 ${
              theme === "dark" ? "text-success" : "text-primary"
            }`}
          />
          <h3 className="mt-2 fw-bold">GoGreen Quest</h3>
          <p className="text-muted">Welcome back, Eco Hero!</p>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-${theme === "dark" ? "success" : "primary"} w-100`}
          >
            Login
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
    </div>
  );
};

export default LoginPage;
