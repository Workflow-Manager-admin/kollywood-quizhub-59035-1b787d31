//
// Utilities for Kollywood QuizHub: localStorage-based quiz progress/history.
//

// PUBLIC_INTERFACE
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// PUBLIC_INTERFACE
export function loadFromStorage(key) {
  const v = localStorage.getItem(key);
  if (!v) return null;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// PUBLIC_INTERFACE
export function loadAllUserResults(username) {
  // Returns all quiz results for a user (finds all quizResult_<user>_* keys)
  const keys = Object.keys(localStorage).filter(k => k.startsWith(`quizResult_${username}_`));
  return keys.map(k => {
    const v = localStorage.getItem(k);
    try {
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  }).filter(Boolean).sort((a, b) => b.ts - a.ts);
}
