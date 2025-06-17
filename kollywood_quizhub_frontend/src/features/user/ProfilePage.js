import React, { useState, useEffect } from "react";
import { loadAllUserResults } from "../../utils/storage";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function ProfilePage({ user }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(loadAllUserResults(user.username));
  }, [user.username]);

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  return (
    <div className="profile-container" style={{ maxWidth: 480, margin: "60px auto", background: "#fff", borderRadius: 16, padding: 24 }}>
      <h2>Your Profile</h2>
      <div><b>Username:</b> {user.username}</div>
      <div><b>Role:</b> {user.role || "user"}</div>
      <hr />
      <div style={{ marginTop: 16 }}>
        <h4>Your Quiz History</h4>
        {history.length ? (
          <table style={{ width: "100%", fontSize: 14 }}>
            <thead>
              <tr><th>Date</th><th>Type</th><th>Score</th></tr>
            </thead>
            <tbody>
              {history.map(res => (
                <tr key={res.ts}>
                  <td>{new Date(res.ts).toLocaleString()}</td>
                  <td>{res.quizType}</td>
                  <td>{calcScore(res)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No saved quiz results yet.</div>
        )}
      </div>
      <hr />
      <button className="btn" style={{ background: "#f702cb" }} onClick={handleLogout}>Logout</button>
    </div>
  );
}

function calcScore(res) {
  let correct = 0;
  res.questions?.forEach((q, idx) => {
    if ((res.answers?.[idx] || "").toLowerCase().includes((q.answer || "").toLowerCase())) correct += 1;
  });
  return correct + "/" + (res.questions?.length || 0);
}
