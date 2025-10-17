import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ActivitiesPage from "./pages/ActivitiesPage";
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/activity" element={<ActivitiesPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
