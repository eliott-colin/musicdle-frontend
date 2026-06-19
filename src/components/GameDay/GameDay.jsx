import { useState, useEffect } from "react";
import { useSearch } from "../../hooks/useSearch";
import { useGuess } from "../../hooks/useGuess";
import GuessRow from "./GuessRow";
import "./GameDay.css";
import { useGenre } from "../../hooks/useGenre";
import GameLegend from "./GameLegend";

function GameDay({ id = "" }) {
  const [searchValue, setSearchValue] = useState(id);
  const [numberTry, setNumberTry] = useState(0);

  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  const {
    tracks,
    loading,
    error: searchError,
    setTracks,
  } = useSearch(searchValue);
  const { history, hints, error: guessError, compare } = useGuess();
  const { genre: targetGenre, error: genreError } = useGenre();

  const handleSelect = (track) => {
    compare(track);
    setSearchValue("");
    setTracks([]);
    setNumberTry((previous) => previous + 1);
  };

  return (
    <section className="game-day-card">
      <div className="game-header">
        <p className="generation">Daily Game</p>
        <h2>Devine le morceau d'aujourd'hui</h2>
      </div>

      {numberTry > 0 ? (
        <div className="hints">
          <h3>Indices</h3>
          {numberTry >= 3 && targetGenre ? (
            <p className="hint-genre">Genre du morceau: {targetGenre}</p>
          ) : null}
          {hints.length === 0 ? (
            <p>Aucun indice pour le moment</p>
          ) : (
            hints.map((hint, index) => (
              <p
                key={index}
                className={`hint ${hint.direction || hint.status}`}
              >
                {hint.text}
              </p>
            ))
          )}
        </div>
      ) : (
        ""
      )}

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
      {(searchError || guessError) && (
        <p className="game-day-message error">{searchError || guessError}</p>
      )}

      {tracks.length > 0 && (
        <ul className="game-day-results">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="game-day-result clickable"
              onClick={() => handleSelect(track)}
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
          <div>Durée du morceau</div>
        </div>
      )}

      <div className="history">
        {history.map((item, i) => (
          <GuessRow key={i} item={item} />
        ))}
      </div>

      <GameLegend />
    </section>
  );
}

export default GameDay;
