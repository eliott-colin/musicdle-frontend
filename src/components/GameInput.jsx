import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";

function GameInput({ id = "" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tracks, setTracks] = useState([]);
  const [searchValue, setSearchValue] = useState(id);

  // get the searching value in the input
  useEffect(() => {
    setSearchValue(id);
  }, [id]);
 
  return (
    <section className="game-day-card">
      <div className="game-day-form">
        <label className="game-day-label" htmlFor="research">
          Ecris le nom d'un artiste
        </label>
        <div className="game-day-row">
          <input
            id="research"
            className="game-day-input"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Ex: Daft Punk"
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
      <SubmitButton text="Soumettre ma réponse" disabled={false}/>
    </section>
  );
}

export default GameInput;