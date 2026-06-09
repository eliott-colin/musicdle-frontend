function SearchResults({ tracks, onSelect }) {
  if (!tracks.length) return null;

  return (
    <ul className="game-day-results">
      {tracks.map((track) => (
        <li
          key={track.id}
          className="game-day-result clickable"
          onClick={() => onSelect(track)}
        >
          <div className="game-day-track">
            <div className="game-day-track-info">
              <strong>{track.track}</strong>
              <span>{track.artist}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;