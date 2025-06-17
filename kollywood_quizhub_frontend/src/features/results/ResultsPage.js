import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function ResultsPage({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], answers = {}, quizType } = location.state || {};

  function restart() {
    navigate("/quiz");
  }

  function goHome() {
    navigate("/");
  }

  if (!questions.length)
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <p>There was an issue showing your quiz result.</p>
        <button className="btn" onClick={goHome}>Home</button>
      </div>
    );

  // Basic score calculation (string match, demo only)
  let correct = 0;
  questions.forEach((q, idx) => {
    // Naive: if user’s answer lowercase includes answer
    const ua = (answers[idx] || "").toLowerCase();
    const ca = (q.answer || "").toLowerCase();
    if (ua && ca && ua.includes(ca)) correct += 1;
  });

  return (
    <div className="results-container" style={{ maxWidth: 540, margin: "60px auto", background: "#fff", borderRadius: 14, padding: 28 }}>
      <h2>Quiz Results</h2>
      <div style={{ margin: "1rem 0" }}>You scored <span style={{ color: "#f702cb", fontWeight: 700 }}>{correct}</span> / {questions.length}</div>
      <hr />
      {questions.map((q, idx) => (
        <div key={q.id || idx} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: "bold" }}>{idx + 1}. {q.question}</div>
          <div>
            <span style={{ color: "#017418" }}>{answers[idx]}</span>
            {answers[idx]?.toLowerCase().includes((q.answer || "").toLowerCase()) ? (
              <span style={{ marginLeft: 8, color: "#017418" }}>✔</span>
            ) : (
              <span style={{ marginLeft: 8, color: "#eb2323" }}>✘ (Correct: <b>{q.answer}</b>)</span>
            )}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 32 }}>
        <button className="btn" style={{ marginRight: 12 }} onClick={restart}>Play Again</button>
        <button className="btn" onClick={goHome}>Go Home</button>
      </div>
    </div>
  );
}
