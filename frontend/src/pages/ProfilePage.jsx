import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaSignOutAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [selectedDate, setSelectedDate] = useState(null);
    const [activitiesForDate, setActivitiesForDate] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!user) return null;

    // Extract activity dates from user's calendar array
    const activityDates = user.calendar?.map((entry) => new Date(entry.date)) || [];

    // Highlight dates with activity
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            const isActive = activityDates.some(
                (d) =>
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
            );
            return isActive ? "activity-date" : null;
        }
    };

    // Handle date click
    const handleDateClick = (date) => {
        setSelectedDate(date);
        const activities = user.calendar?.filter((entry) => {
            const entryDate = new Date(entry.date);
            return (
                entryDate.getDate() === date.getDate() &&
                entryDate.getMonth() === date.getMonth() &&
                entryDate.getFullYear() === date.getFullYear()
            );
        }) || [];
        setActivitiesForDate(activities);
    };

    return (
        <div
            className={`profile-page py-5 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "url('https://i.pinimg.com/originals/2c/2f/9e/2c2f9e97b6d42fdb8ac2446e0818f969.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container text-center">
                {/* Header */}
                <h1 className="mb-3">Welcome, {user.name}!</h1>
                <p className="text-muted mb-4">{user.email}</p>

                {/* Points Card */}
                <div
                    className={`points-card mx-auto mb-5 p-4 rounded shadow ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`}
                    style={{ maxWidth: "400px" }}
                >
                    <h3>Total Points</h3>
                    <h1 className="display-4 fw-bold text-success">{user.points || 0}</h1>
                </div>

                {/* Badges */}
                <div className="mb-5">
                    <h4>Badges Earned:</h4>
                    <div className="d-flex flex-wrap justify-content-center mt-3 gap-3">
                        {user.badges && user.badges.length > 0 ? (
                            user.badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className={`badge-card p-3 rounded shadow ${theme === "dark" ? "bg-success text-light" : "bg-primary text-light"}`}
                                    style={{ width: "130px" }}
                                >
                                    <div className="fs-2 mb-1">{badge.icon || "🏅"}</div>
                                    <div className="fw-bold">{badge.name}</div>
                                    <small className="text-light-50">{badge.threshold} pts</small>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No badges earned yet.</p>
                        )}
                    </div>
                </div>

                {/* Calendar */}
                <div className="calendar-section mb-5">
                    <h4>Your Activity Calendar</h4>
                    <div className="d-flex justify-content-center mt-3">
                        <Calendar
                            onClickDay={handleDateClick}
                            value={selectedDate || new Date()}
                            tileClassName={tileClassName}
                            className={`rounded shadow-lg p-3 ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`}
                        />
                    </div>
                </div>

                {/* Show Activities for Selected Date */}
                {selectedDate && (
                    <div
                        className={`activities-list mx-auto p-4 rounded shadow ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`}
                        style={{ maxWidth: "600px" }}
                    >
                        <h5 className="mb-3">
                            Activities on{" "}
                            {selectedDate.toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </h5>
                        {activitiesForDate.length > 0 ? (
                            <ul className="list-group">
                                {activitiesForDate.map((act, index) => (
                                    <li
                                        key={index}
                                        className={`list-group-item ${theme === "dark" ? "bg-dark text-light border-light" : "bg-light text-dark"}`}
                                    >
                                        <strong>{act.activityType}</strong> — {act.pointsEarned} pts, CO₂ saved: {act.co2Saved} kg
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No activities on this day.</p>
                        )}
                    </div>
                )}

                {/* Logout */}
                <button className="btn btn-outline-danger mt-5 px-4" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
