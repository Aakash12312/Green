// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { motion } from "framer-motion";
// import { FaLeaf, FaTrophy, FaUsers, FaSun, FaMoon } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "../styles/HomePage.css";

// const HomePage = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//     document.body.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

//   return (
//     <div className={`homepage text-${theme === "dark" ? "light" : "dark"}`}>
//       {/* NAVBAR */}
//       <nav className={`navbar navbar-expand-lg py-3 ${theme === "dark" ? "navbar-dark" : "navbar-light"} bg-transparent`}>
//         <div className="container-fluid">
//           <a className={`navbar-brand fw-bold fs-3 ${theme === "dark" ? "text-success" : "text-primary"}`} href="#">
//             🌱 GoGreen Quest
//           </a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//             <ul className="navbar-nav gap-3 align-items-center">
//               <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">Features</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">Leaderboard</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">About</a></li>
//               <li className="nav-item">
//                 <a className={`btn btn-${theme === "dark" ? "success" : "primary"} px-3 fw-semibold`} href="/login">
//                   Join Now
//                 </a>
//               </li>
//               <li className="nav-item ms-3">
//                 <button className="btn btn-outline-secondary rounded-circle p-2" onClick={toggleTheme}>
//                   {theme === "dark" ? <FaSun className="text-warning"/> : <FaMoon className="text-dark"/>}
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <motion.section
//         className={`hero ${theme === "dark" ? "hero-dark" : "hero-light"}`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.h1
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="display-3 fw-bold"
//         >
//           Play,Learn.<span className={theme === "dark" ? "text-success" : "text-primary"}>Go Green.</span>
//         </motion.h1>


//         <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
//           <a href="/login" className={`btn btn-lg btn-${theme === "dark" ? "success" : "primary"} px-4`}>Start Your Journey</a>
//           <a href="#" className="btn btn-outline-secondary btn-lg px-4">Learn More</a>
//         </div>
//       </motion.section>

//       {/* FEATURES */}
//       <section className="features container py-5 text-center" data-aos="fade-up">
//         <h2 className="fw-bold mb-4">Why Join GoGreen Quest?</h2>
//         <div className="row">
//           <div className="col-md-4 mb-4">
//             <div className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
//               <FaLeaf className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"}`} />
//               <h5>Track Eco Actions</h5>
//               <p>Log your eco-friendly tasks and watch your green points grow!</p>
//             </div>
//           </div>
//           <div className="col-md-4 mb-4">
//             <div className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
//               <FaUsers className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"}`} />
//               <h5>Compete with Friends</h5>
//               <p>Join leaderboards and see who contributes most to our planet!</p>
//             </div>
//           </div>
//           <div className="col-md-4 mb-4">
//             <div className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
//               <FaTrophy className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"}`} />
//               <h5>Unlock Badges</h5>
//               <p>Complete challenges and earn unique green badges for your profile!</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* LEADERBOARD */}
//       <section className={`leaderboard-preview py-5 ${theme === "dark" ? "bg-success bg-opacity-10" : "bg-light"}`} data-aos="fade-up">
//         <div className="container text-center">
//           <h2 className="fw-bold mb-4">Top Green Heroes 🌍</h2>
//           <div className="table-responsive">
//             <table className={`table table-${theme === "dark" ? "dark" : "light"} table-striped table-hover rounded-3`}>
//               <thead>
//                 <tr><th>#</th><th>Name</th><th>Points</th></tr>
//               </thead>
//               <tbody>
//                 <tr><td>1</td><td>EcoWarrior</td><td>920</td></tr>
//                 <tr><td>2</td><td>TreeSaver</td><td>850</td></tr>
//                 <tr><td>3</td><td>RecycleHero</td><td>790</td></tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className={`py-4 text-center ${theme === "dark" ? "bg-dark text-muted" : "bg-light text-secondary"}`}>
//         <div>© 2025 GoGreen Quest | Built with 💚 by EarthLovers</div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


// ---------------------------------------------------------
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion } from "framer-motion";
import { FaLeaf, FaTrophy, FaUsers, FaSun, FaMoon } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/HomePage.css";

const HomePage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [leaderboard, setLeaderboard] = useState([]);

  // Load AOS and theme on mount
  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort by points descending (if backend doesn't already)
          const sorted = data.sort((a, b) => b.points - a.points);
          setLeaderboard(sorted);
        }
      } catch (error) {
        console.error("❌ Failed to fetch leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className={`homepage text-${theme === "dark" ? "light" : "dark"}`}>
      {/* ===== HERO SECTION ===== */}
      <motion.section
        className={`hero ${theme === "dark" ? "hero-dark" : "hero-light"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="display-3 fw-bold text-center"
        >
          <span className="d-block">PLAY,LEARN.</span>
          <span
            className={`d-block mt-2 ${theme === "dark" ? "go-green-dark" : "go-green-light"
              }`}
          >
            GO GREEN.
          </span>
        </motion.h1>

        <div className="mt-4 d-flex justify-content-center">
          <a
            href="/login"
            className={`btn btn-lg btn-${theme === "dark" ? "success" : "primary"
              } px-4`}
          >
            Start Your Journey
          </a>
        </div>
      </motion.section>

      {/* ===== FEATURES ===== */}
      <section
        className="features container py-5 text-center"
        data-aos="fade-up"
      >
        <h2 className="fw-bold mb-4">Why Join GoGreen Quest?</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
                }`}
            >
              <FaLeaf
                className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"
                  }`}
              />
              <h5>Track Eco Actions</h5>
              <p>Log your eco-friendly tasks and watch your green points grow!</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
                }`}
            >
              <FaUsers
                className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"
                  }`}
              />
              <h5>Compete with Friends</h5>
              <p>Join leaderboards and see who contributes most to our planet!</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className={`card feature-card p-4 border-0 shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
                }`}
            >
              <FaTrophy
                className={`fs-1 mb-3 ${theme === "dark" ? "text-success" : "text-primary"
                  }`}
              />
              <h5>Unlock Badges</h5>
              <p>
                Complete challenges and earn unique green badges for your
                profile!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERBOARD ===== */}
      <section
        className={`leaderboard-preview py-5 ${theme === "dark" ? "bg-success bg-opacity-10" : "bg-light"
          }`}
        data-aos="fade-up"
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Top Green Heroes 🌍</h2>
          <div className="table-responsive">
            <table
              className={`table table-${theme === "dark" ? "dark" : "light"
                } table-striped table-hover rounded-3`}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((user, index) => (
                    <tr key={user._id || index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      Loading leaderboard...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className={`py-4 text-center ${theme === "dark" ? "bg-dark text-muted" : "bg-light text-secondary"
          }`}
      >
        <div>© 2025 GoGreen Quest | Built with 💚 by Code_Smashers</div>
      </footer>
    </div>
  );
};

export default HomePage;
