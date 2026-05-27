import { Link } from "react-router-dom";
import "./dailyGame.css";

function DailyGame({ mode, description }) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
  });
  const currentDay = formattedDate.split(" ")[0];
  const currentMonth = formattedDate.split(" ")[1];

  return (
    <>
      <Link
        to={`/game/${currentDay}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="daily-card">
          <div className="bg-daily-game">
            <div className="mode-container">
              <img src="/musicdle/images/headphone.png" alt="" />
            </div>

            <div className="right-content">
              <span className="challenge-name">{mode}</span>
              <span className="game-description">→ {description}</span>
            </div>
            <p>〉</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default DailyGame;
