// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (!storedUser) {
            navigate("/login"); // Redirect if no user
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/"); // Redirect to home page
    };

    if (!user) return null; // Don't render until user is loaded

    return (
        <div className={`profile-page py-5 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <div className="container text-center">
                <h1 className="mb-4">Welcome, {user.name}!</h1>
                <h3 className="mb-4">Total Points: {user.points || 0}</h3>

                <div className="mb-5">
                    <h4>Badges Earned:</h4>
                    <div className="d-flex flex-wrap justify-content-center mt-3 gap-3">
                        {user.badges && user.badges.length > 0 ? (
                            user.badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className={`badge-card p-3 rounded shadow ${theme === "dark" ? "bg-success text-light" : "bg-primary text-light"}`}
                                >
                                    <div className="fs-3 mb-1">{badge.icon || "🏅"}</div>
                                    <div>{badge.name}</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No badges earned yet.</p>
                        )}
                    </div>
                </div>

                <button className="btn btn-outline-danger px-4" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
