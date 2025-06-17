import React, { useEffect, useState } from "react";
import { fetchKollywoodMovies, fetchKollywoodActors } from "../../tmdbApi";

// PUBLIC_INTERFACE
export default function QuizAdminPage() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo: load a sample of data
    Promise.all([fetchKollywoodMovies(1), fetchKollywoodActors(1)]).then(
      ([movieData, actorData]) => {
        setMovies(movieData.results || []);
        setActors(actorData.results || []);
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: 48 }}>Loading quiz data…</div>;

  return (
    <div className="admin-container" style={{ maxWidth: 750, margin: "64px auto", background: "#fff", borderRadius: 12, padding: 18 }}>
      <h2>Quiz Data Admin View</h2>
      <section>
        <h4>TMDb Kollywood Movies (Sample)</h4>
        <table style={{ fontSize: 13, background: "#f9fafb", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {movies.slice(0, 8).map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.title}</td>
                <td>{m.release_date ? m.release_date.slice(0, 4) : "?"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h4>TMDb Kollywood Actors (Sample)</h4>
        <ul>
          {actors.slice(0, 8).map(a => <li key={a.id}>{a.name}</li>)}
        </ul>
      </section>
      <div style={{ fontSize: 12, marginTop: 18, color: "#464646" }}>This is a demo admin panel for quiz data snapshots. For real admin features, add backend!</div>
    </div>
  );
}
