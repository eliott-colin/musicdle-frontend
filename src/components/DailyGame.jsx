import { Link } from "react-router-dom";
import "./dailyGame.css";

function DailyGame() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
  });
  const currentDay = formattedDate.split(" ")[0];
  const currentMonth = formattedDate.split(" ")[1];

  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="daily-card">
      <Link
        to={`/games/classic/`}
        style={{ textDecoration: "none", color: "black" }}>
        <div className="daily-game-hour">{formattedTime}</div>
        <div className="bg-daily-game">
          <div className="date-container">
            <span className="current-day">{currentDay} </span>
            {currentMonth}
          </div>

          <div className="right-content">
            <span className="challenge-name">Challenge du jour</span>

            <button className="play-btn" type="button">
              JOUER
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default DailyGame;
