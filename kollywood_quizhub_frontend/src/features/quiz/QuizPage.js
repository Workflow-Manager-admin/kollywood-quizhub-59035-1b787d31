import React, { useEffect, useState } from "react";
import { fetchKollywoodMovies, fetchKollywoodActors, fetchMovieDetails } from "../../tmdbApi";
import { useNavigate } from "react-router-dom";
import { saveToStorage, loadFromStorage, removeFromStorage } from "../../utils/storage";

// Generate in-memory quiz Qs from TMDb movie/person data (client-only, shuffle questions)
// Export for admin utility too
function generateMovieQuiz(quizData, numQuestions = 8) {
  // quizData: array of TMDb movie objects
  if (!quizData || quizData.length === 0) return [];
  const shuffled = [...quizData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions).map(m => ({
    id: m.id,
    type: "movie",
    question: `Who was the lead actor in "${m.title}" (${m.release_date ? m.release_date.slice(0, 4) : "?"})?`,
    answer: m.leadActor || "Unknown", // Placeholder: could auto-fetch/cross-query cast for demo
    movie: m,
  }));
}

function generateActorQuiz(actorsData, numQuestions = 6) {
  // actorsData: array of actor objects
  if (!actorsData || actorsData.length === 0) return [];
  const shuffled = [...actorsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions).map(a => ({
    id: a.id,
    type: "actor",
    question: `Which is a famous Kollywood film starring "${a.name}"?`,
    answer: a.known_for?.[0]?.title ?? "Unknown",
  }));
}

// PUBLIC_INTERFACE
export default function QuizPage({ user }) {
  const navigate = useNavigate();

  // Track game state
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizType, setQuizType] = useState(null); // "movie" | "actor" | null

  useEffect(() => {
    // On "resume": Try to load lastQuizProgress if available for this user
    const saved = loadFromStorage("lastQuizProgress");
    if (saved && saved.username === user.username && saved.quizType && saved.questions && saved.answers) {
      setQuestions(saved.questions);
      setQuizType(saved.quizType);
      setAnswers(saved.answers);
      setStep(saved.currentStep || 0);
      setLoading(false);
    }
  }, [user.username]);

  function startQuiz(type) {
    setLoading(true);
    if (type === "movie") {
      fetchKollywoodMovies(1).then(data => {
        if (data && data.results) {
          // For each movie, try to get lead actor (just simulate for demo, or extra API call)
          // In production, batch fetch the cast; here just pick 'Unknown'
          const quizQs = generateMovieQuiz(data.results, 8);
          setQuestions(quizQs);
          setQuizType("movie");
          setAnswers({});
          setStep(0);
        }
        setLoading(false);
      });
    } else if (type === "actor") {
      fetchKollywoodActors(1).then(data => {
        if (data && data.results) {
          const quizQs = generateActorQuiz(data.results, 6);
          setQuestions(quizQs);
          setQuizType("actor");
          setAnswers({});
          setStep(0);
        }
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    // Save progress for resumes
    if ((questions && questions.length) || (quizType && step >= 0)) {
      saveToStorage("lastQuizProgress", {
        username: user.username,
        quizType,
        questions,
        answers,
        currentStep: step,
      });
    }
  }, [questions, answers, quizType, step, user.username]);

  function answerQuestion(ans) {
    setAnswers(a => ({ ...a, [step]: ans }));
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      removeFromStorage("lastQuizProgress");
      // Store results (optionally extend to history)
      saveToStorage(`quizResult_${user.username}_${+new Date()}`, {
        questions,
        answers: { ...answers, [step]: ans },
        quizType,
        ts: +new Date(),
      });
      navigate("/results", {
        state: {
          questions,
          answers: { ...answers, [step]: ans },
          quizType,
        },
      });
    }
  }

  function quitQuiz() {
    removeFromStorage("lastQuizProgress");
    setQuizType(null);
    setQuestions([]);
    setStep(0);
    setAnswers({});
    setLoading(false);
  }

  if (loading)
    return <div style={{ textAlign: "center", marginTop: 48 }}>Loading...</div>;

  if (!quizType)
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <h2>Ready for a Kollywood Quiz?</h2>
        <div style={{ margin: "32px 0" }}>
          <button className="btn btn-large" style={{ marginRight: 16, background: "#f702cb", color: "#fff" }} onClick={() => startQuiz("movie")}>
            Start Movie Quiz
          </button>
          <button className="btn btn-large" style={{ background: "#1a1814", color: "#f9fafb" }} onClick={() => startQuiz("actor")}>
            Start Actor Quiz
          </button>
        </div>
        <small style={{ color: "#888" }}>Quiz questions are randomly generated from popular Kollywood TMDb data.</small>
      </div>
    );

  if (!questions.length)
    return (
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <p>No quiz questions found. Please try again.</p>
        <button className="btn" onClick={quitQuiz}>Go Back</button>
      </div>
    );

  const q = questions[step];

  return (
    <div className="quiz-container" style={{ maxWidth: 640, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 18px #e9e9e9", padding: 24 }}>
      <div>
        <button className="btn" style={{ float: "right", background: "#ececec", color: "#333" }} onClick={quitQuiz}>
          Quit Quiz
        </button>
        <div style={{ fontSize: 18, margin: "20px 0" }}>
          Question {step + 1} of {questions.length}
        </div>
        <div className="quiz-question" style={{ fontWeight: 600, fontSize: 20, color: "#262626", marginBottom: 24 }}>
          {q.question}
        </div>
        <AnswerBox q={q} submit={answerQuestion} userAns={answers[step]} />
      </div>
    </div>
  );
}

// Flexible for different question types
function AnswerBox({ q, submit, userAns }) {
  const [input, setInput] = useState("");
  if (userAns !== undefined)
    return (<div>
      <div>Your answer: <strong>{userAns}</strong> <span style={{ color: "#aaa" }}>(locked)</span></div>
      <button className="btn" style={{ marginTop: 16 }} onClick={() => submit(userAns)}>
        Continue
      </button>
    </div>);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit(input);
      }}
      style={{ marginTop: 16 }}
    >
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your answer here"
        required
        style={{ fontSize: 16, padding: "8px 12px", border: "1px solid #e0e0e0", borderRadius: 8 }}
        autoFocus
      />
      <button className="btn" style={{ marginLeft: 16, background: "#f702cb" }}>Submit</button>
    </form>
  );
}
