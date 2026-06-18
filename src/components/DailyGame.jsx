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
    <>
      <Link
        to={`/games/classic/`}
        style={{ textDecoration: "none", color: "black" }}>
        <div className="daily-card">
          {/* illustration */}
          <div className="daily-game-hour">{formattedTime}</div>

          <div className="bg-daily-game">
            <div className="date-container">
              <span className="current-day">{currentDay} </span>
              {currentMonth}
            </div>

            <div className="right-content">
              <span className="challenge-name">Challenge du jour</span>
              <button className="play-btn">JOUER</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default DailyGame;
