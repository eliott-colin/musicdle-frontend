import { useEffect, useState } from "react";
import "./GameDay.css";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function buildApiUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }
  return url.toString();
}

function GameDay({ id = "" }) {
  const [searchValue, setSearchValue] = useState(id);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  useEffect(() => {
    const query = searchValue.trim();

    if (!query) {
      setTracks([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(buildApiUrl("/api/search", { q: query }));

        if (!response.ok) {
          throw new Error(`Le serveur a repondu avec le code ${response.status}.`);
        }

        const data = await response.json();
        const nextTracks = data?.tracks ?? data?.items ?? data;
        setTracks(Array.isArray(nextTracks) ? nextTracks : []);
      } catch (fetchError) {
        setTracks([]);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Erreur lors de la recherche Spotify."
        );
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <section className="game-day-card">
      <div className="game-day-form">
        <label className="game-day-label" htmlFor="research">
          Ecris un morceau, un artiste ou un mot-cle.
        </label>
        <div className="game-day-row">
          <input
            id="research"
            className="game-day-input"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Ex: Que, Daft Punk, Shape of You"
            aria-label="Recherche Spotify"
          />
        </div>
      </div>

      {loading ? <p className="game-day-message">Recherche...</p> : null}
      {error ? <p className="game-day-message error">{error}</p> : null}

      {tracks.length > 0 ? (
        <ul className="game-day-results">
          {tracks.map((track) => (
            <li key={track.id} className="game-day-result">
              <div className="game-day-track">
                <img
                  src={track?.cover}
                  alt={track?.track || "Track"}
                  width="100"
                  height="100"
                  style={{ borderRadius: "14px" }}
                />
                <div className="game-day-track-info">
                  <strong>{track?.track}</strong>
                  <span>{track?.artist}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default GameDay;