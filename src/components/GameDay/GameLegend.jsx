import "../dailyGame.css";

function GameLegend() {
  return (
    <div className="legend">
      <h3>Comment lire les indices ?</h3>

      <div className="legend-section">
        <h4>Couleurs</h4>
        <div className="legend-row">
          <span className="box bg-green"></span>
          <span>Correct</span>
        </div>
        <div className="legend-row">
          <span className="box bg-yellow"></span>
          <span>Proche</span>
        </div>
        <div className="legend-row">
          <span className="box bg-red"></span>
          <span>Loin</span>
        </div>
      </div>

      <div className="legend-section">
        <h4>Indices</h4>
        <div className="legend-row">
          <span>⬆</span>
          <span>Plus récent / plus long</span>
        </div>
        <div className="legend-row">
          <span>⬇</span>
          <span>Plus ancien / plus court</span>
        </div>
      </div>
    </div>
  );
}

export default GameLegend;
