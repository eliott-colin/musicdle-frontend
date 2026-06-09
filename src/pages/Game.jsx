import { useParams } from "react-router-dom";
import "../components/dailyGame.css";
import GameDay from "../components/GameDay/GameDay";

function Game() {

  return (
    <main className="page-shell">
      <div className="header-game">
        <img src="/musicdle/images/perso_battle.png" alt="deco" />
      </div>

      <div className="hero-panel">
        <GameDay />
        
        <section className="result-card"></section>
      </div>
    </main>
  );
}

export default Game;