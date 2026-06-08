import { useEffect, useState } from "react";
import "./GameDay.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

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
  const [history, setHistory] = useState([]);
  const [hints, setHints] = useState([]);
  const [secret, setSecret] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  // FAKE SECRET (API spotify of the day)
  useEffect(() => {
    setSecret({
      track: "Couleur menthe à l'eau",
      artist: "Eddy Mitchell",
      album: "Happy Birthday",
      year: 1980,
    });
  }, []);

  // user research with API Spotify
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
          throw new Error(`Serveur ${response.status}`);
        }

        const data = await response.json();
        const nextTracks = data?.tracks ?? data?.items ?? data;

        // Limit to 3 results
        setTracks(Array.isArray(nextTracks) ? nextTracks.slice(0, 3) : []);
      } catch (err) {
        setTracks([]);
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // Compare tracks search with the secret one
  const compare = (track) => {
    if (!secret) return;

    const result = {
      ...track,

      titleState:
        track.track.toLowerCase() === secret.track.toLowerCase()
          ? "correct"
          : "wrong",

      artistState:
        track.artist.toLowerCase() === secret.artist.toLowerCase()
          ? "correct"
          : "wrong",

      albumState:
        track.album.toLowerCase() === secret.album.toLowerCase()
          ? "correct"
          : "wrong",

      yearState:
        track.year === secret.year
          ? "correct"
          : track.year > secret.year
            ? "close" // TO DO add arrow up or down ==> to early
            : "close", // TO DO add arrow up or down ==> to ancient
    };

    setHistory((prev) => [result, ...prev]);

    const newHints = [];
    if (result.artistState === "correct") newHints.push("Bon artiste !");
    if (result.yearState === "close") newHints.push("Année proche !");
    if (result.titleState === "correct") newHints.push("GG → trouvé !");

    setHints(newHints);
  };

  const getColor = (state) => {
    switch (state) {
      case "correct":
        return "bg-green border-black";
      case "close":
        return "bg-yellow border-black";
      default:
        return "bg-red border-black";
    }
  };

  return (
    <section className="game-day-card">
      <div className="game-header">
        <p className="generation">Daily Game</p>
        <h2>Devine le morceau d’aujourd’hui</h2>
      </div>

      <div className="game-day-form">
        <input
          className="game-day-input"
          type="text"
          placeholder="Tape le nom du morceau"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {loading && <p className="game-day-message">Recherche...</p>}
      {error && <p className="game-day-message error">{error}</p>}

      {tracks.length > 0 && (
        <ul className="game-day-results">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="game-day-result clickable"
              onClick={() => {
                compare(track);
                setSearchValue("");
                setTracks([]);
              }}
            >
              <div className="game-day-track">
                {track?.cover && <img src={track.cover} alt="" />}
                <div className="game-day-track-info">
                  <strong>{track.track}</strong>
                  <span>{track.artist}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <div className="guess-header">
          <div>Titre</div>
          <div>Artiste</div>
          <div>Album</div>
          <div>Année</div>
        </div>
      )}

      <div className="history">
        {history.map((item, i) => (
          <div key={i} className="guess-row">
            <div className={`cell ${getColor(item.titleState)}`}>
              {item.track}
            </div>

            <div className={`cell ${getColor(item.artistState)}`}>
              {item.artist}
            </div>

            <div className={`cell ${getColor(item.albumState)}`}>
              <span>{item.album}</span>
            </div>

            <div className={`cell ${getColor(item.yearState)}`}>
              {item.year}
            </div>
          </div>
        ))}
      </div>

      <div className="hints">
        <h3>Indices</h3>
        {hints.length === 0 ? (
          <p>Aucun indice pour le moment</p>
        ) : (
          hints.map((h, i) => <p key={i}>{h}</p>)
        )}
      </div>
    </section>
  );
}

export default GameDay;
