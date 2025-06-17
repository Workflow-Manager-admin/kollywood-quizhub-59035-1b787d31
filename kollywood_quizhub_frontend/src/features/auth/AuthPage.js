import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getAuthenticatedUser } from "../../utils/auth";

// PUBLIC_INTERFACE
export default function AuthPage({ setUser }) {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  function onLogin(credentials) {
    try {
      const user = login(credentials.username, credentials.password);
      setUser(user);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  }

  function onRegister(credentials) {
    try {
      const user = register(credentials.username, credentials.password);
      setUser(user);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="auth-container" style={{ maxWidth: 400, margin: "60px auto", padding: 24, background: "var(--primary, #fff)", borderRadius: 12, boxShadow: "0 2px 12px #ececec" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: 32, justifyContent: "center" }}>
        <button
          className={`btn ${tab === "login" ? "btn-active" : ""}`}
          style={{ background: tab === "login" ? "var(--secondary, #f702cb)" : "#ececec", color: tab === "login" ? "#fff" : "#000" }}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`btn ${tab === "register" ? "btn-active" : ""}`}
          style={{ background: tab === "register" ? "var(--secondary, #f702cb)" : "#ececec", color: tab === "register" ? "#fff" : "#000" }}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>
      {tab === "login" ? <LoginForm onSubmit={onLogin} /> : <RegisterForm onSubmit={onRegister} />}
    </div>
  );
}

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handle(e) {
    e.preventDefault();
    onSubmit({ username, password });
  }
  return (
    <form onSubmit={handle}>
      <label>Username:
        <input value={username} onChange={e => setUsername(e.target.value)} autoFocus required minLength={3} />
      </label>
      <br />
      <label>Password:
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required minLength={4} />
      </label>
      <br />
      <button type="submit" className="btn btn-large" style={{ marginTop: 12 }}>Login</button>
    </form>
  );
}

function RegisterForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handle(e) {
    e.preventDefault();
    onSubmit({ username, password });
  }
  return (
    <form onSubmit={handle}>
      <label>Username:
        <input value={username} onChange={e => setUsername(e.target.value)} autoFocus required minLength={3} />
      </label>
      <br />
      <label>Password:
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required minLength={4} />
      </label>
      <br />
      <button type="submit" className="btn btn-large" style={{ marginTop: 12 }}>Register</button>
    </form>
  );
}
