//
// Authentication utility for Kollywood QuizHub frontend (no backend, localStorage only).
//

const USERS_KEY = "kollywood_users";
const AUTH_KEY = "kollywood_auth_user";

// PUBLIC_INTERFACE
export function register(username, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  if (users[username]) throw new Error("Username already exists!");
  users[username] = { password, data: {}, role: username === "admin" ? "admin" : "user" };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_KEY, JSON.stringify({ username, role: users[username].role }));
  return { username, role: users[username].role };
}

// PUBLIC_INTERFACE
export function login(username, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  if (!users[username] || users[username].password !== password) throw new Error("Invalid login!");
  localStorage.setItem(AUTH_KEY, JSON.stringify({ username, role: users[username].role }));
  return { username, role: users[username].role };
}

// PUBLIC_INTERFACE
export function getAuthenticatedUser() {
  const u = localStorage.getItem(AUTH_KEY);
  return u ? JSON.parse(u) : null;
}

// PUBLIC_INTERFACE
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
