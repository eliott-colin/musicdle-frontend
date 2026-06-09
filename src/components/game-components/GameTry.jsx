function GameTry({ history, getColor }) {
  if (!history.length) return null;

  return (
    <>
      <div className="guess-header">
        <div>Titre</div>
        <div>Artiste</div>
        <div>Album</div>
        <div>Année</div>
      </div>

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
              {item.album}
            </div>
            <div className={`cell ${getColor(item.yearState)}`}>
              {item.year}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GameTry;