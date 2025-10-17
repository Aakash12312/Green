// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(storedUser);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <nav
            className={`navbar navbar-expand-lg py-3 ${theme === "dark" ? "navbar-dark" : "navbar-light"} bg-transparent`}
        >
            <div className="container-fluid">
                <a
                    className={`navbar-brand fw-bold fs-3 ${theme === "dark" ? "text-success" : "text-primary"}`}
                    href="/"
                >
                    🌱 GoGreen Quest
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav gap-3 align-items-center">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/activity">Activity</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/leaderboard">Leaderboard</a>
                        </li>
                        

                        {/* Show user name if logged in, otherwise Join Now */}
                        <li className="nav-item">
                            {user ? (
                                <span className={`btn btn-${theme === "dark" ? "success" : "primary"} px-3 fw-semibold`}>
                                    <a href="/profile">{user.name}</a>
                                </span>
                            ) : (
                                <a
                                    className={`btn btn-${theme === "dark" ? "success" : "primary"} px-3 fw-semibold`}
                                    href="/login"
                                >
                                    Join Now
                                </a>
                            )}
                        </li>

                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-outline-secondary rounded-circle p-2"
                                onClick={toggleTheme}
                            >
                                {theme === "dark" ? <FaSun className="text-warning" /> : <FaMoon className="text-dark" />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
