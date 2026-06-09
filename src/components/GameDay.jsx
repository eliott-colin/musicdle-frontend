import { useEffect, useState } from "react";
import "./GameDay.css";
import SearchBar from "./game-components/SearchBar";
import SearchResults from "./game-components/SearchResults";
import GameTry from "./game-components/GameTry";
import Hints from "./game-components/Hints";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

        const response = await fetch(
          buildApiUrl("/api/search", { q: query })
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        const nextTracks = data?.tracks ?? data?.items ?? data;

        setTracks(Array.isArray(nextTracks) ? nextTracks.slice(0, 3) : []);
      } catch {
        setTracks([]);
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  useEffect(() => {
    setSecret({
      track: "Couleur menthe à l'eau",
      artist: "Eddy Mitchell",
      album: "Happy Birthday",
      year: "1980",
    });
  }, []);

  const compare = (track) => {
    if (!secret) return;
    // get the year of the secret one and to the search one
    const trackYear = Number(track.year);
    const secretYear = Number(secret.year);

    let yearState = "wrong";
    let yearHint = null;

    const diff = Math.abs(trackYear - secretYear);

    if (trackYear === secretYear) {
      yearState = "correct";
    } else if (diff <= 5) {
      yearState = "close"; // close if around 5 years
      yearHint = trackYear < secretYear ? "up" : "down";
    } else {
      yearState = "wrong"; // more than 5 years difference ==> red
      yearHint = trackYear < secretYear ? "up" : "down";
    }

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

      yearState,
      yearHint,
    };

      setHistory((prev) => [result, ...prev]);

    const newHints = [];
    if (result.artistState === "correct") newHints.push("Bon artiste !");
    if (result.yearState === "close") newHints.push("Très proche !");
    if (result.yearState === "wrong")
      newHints.push("Plus de 5 ans de différence");
    if (result.titleState === "correct") newHints.push("GG trouvé !");

    setHints(newHints);
  };

  const getColor = (state) =>
    ({
      correct: "bg-green border-black",
      close: "bg-yellow border-black",
      wrong: "bg-red border-black",
    })[state];

  return (
    <section className="game-day-card">
      <div className="game-header">
        <p className="generation">Daily Game</p>
        <h2>Devine le morceau d’aujourd’hui</h2>
      </div>

      <SearchBar value={searchValue} onChange={setSearchValue} />

      {loading && <p>Recherche...</p>}
      {error && <p className="error">{error}</p>}

      <SearchResults
        tracks={tracks}
        onSelect={(track) => {
          compare(track);
          setSearchValue("");
        }}
      />

      <GameTry history={history} getColor={getColor} />
      <Hints hints={hints} />
    </section>
  );
}

export default GameDay;