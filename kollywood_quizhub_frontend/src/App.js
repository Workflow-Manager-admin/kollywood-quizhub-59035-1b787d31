import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./features/auth/AuthPage";
import QuizPage from "./features/quiz/QuizPage";
import ResultsPage from "./features/results/ResultsPage";
import ProfilePage from "./features/user/ProfilePage";
import QuizAdminPage from "./features/admin/QuizAdminPage";
import Navbar from "./components/Navbar";
import { getAuthenticatedUser, logout } from "./utils/auth";
import { loadFromStorage } from "./utils/storage";

// PUBLIC_INTERFACE
function App() {
  const [user, setUser] = useState(getAuthenticatedUser());
  // For client-only routing, popstate for custom navigation/back

  useEffect(() => {
    // Sync user from storage on reload
    setUser(getAuthenticatedUser());
  }, []);

  // Navigation wrapper for logout
  function handleLogout() {
    logout();
    setUser(null);
  }

  // Restore last game mode/progress (optional enhancement)
  // Could be used for "resume quiz?"
  const lastGame = loadFromStorage("lastQuizProgress");

  return (
    <Router>
      <div className="app" style={{ background: "var(--primary-bg, #f9fafb)", minHeight: "100vh" }}>
        <Navbar user={user} onLogout={handleLogout} />
        <main className="container" style={{ paddingTop: "80px", paddingBottom: "48px" }}>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <QuizPage user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/auth"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthPage setUser={setUser} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfilePage user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/quiz"
              element={
                user ? (
                  <QuizPage user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/results"
              element={
                user ? (
                  <ResultsPage user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                user && user.role === "admin" ? (
                  <QuizAdminPage user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer style={{ textAlign: "center", color: "#979797", margin: "24px 0" }}>
          <small>Kollywood QuizHub &copy; {new Date().getFullYear()} • Powered by TMDb and KAVIA</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
