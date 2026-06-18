import { useParams } from "react-router-dom";
import "../components/dailyGame.css";
import GameDay from "../components/GameDay/GameDay";

function Game() {

  return (
    <main className="page-shell page-games">
      <div className="header-game">
        <img src="/musicdle/images/perso_battle.png" alt="deco" />
      </div>

      <div className="hero-panel">
        <GameDay />
      </div>
    </main>
  );
}

export default Game;