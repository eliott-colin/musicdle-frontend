import { useParams } from "react-router-dom";
import GameDay from "../components/GameDay";

function Game() {
  const { id } = useParams();

  return (
    <main className="page-shell">
      <div className="hero-panel" style={{ display: "grid", gap: "18px" }}>
        <GameDay id={id} />
        <section className="result-card">
        </section>
      </div>
    </main>
  );
}

export default Game;