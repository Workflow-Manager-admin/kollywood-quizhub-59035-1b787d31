import React from "react";
import { Link, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function goProfile() {
    navigate("/profile");
  }

  return (
    <nav className="navbar" style={{ background: "#f9fafb", borderBottom: "2px solid #f702cb" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" className="logo" style={{ color: "#1a1814", textDecoration: "none" }}>
          <span className="logo-symbol" style={{ color: "#f702cb", fontWeight: "bold", fontSize: 28 }}>★</span>{" "}
          Kollywood QuizHub
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="btn" style={{ background: "#f702cb", color: "#fff", marginRight: 8 }}>
                {user.username}
              </Link>
              <button className="btn" style={{ background: "#1a1814", color: "#fafafa", marginRight: 8 }} onClick={() => navigate("/")}>Home</button>
              <button className="btn" style={{ background: "#ececec", color: "#1a1814" }} onClick={onLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="btn" style={{ background: "#f702cb", color: "#fff" }}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
