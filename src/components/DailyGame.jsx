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
  return (
    <Link to={`/game/${currentDay}`} style={{ 'textDecoration' : 'none' , color : 'black' }}>
    <div className="bg-daily-game">
      <div className="date-container">
        <span className="current-day">{currentDay} </span>
        {currentMonth}
      </div>
      <span className="challenge-name">Challenge du jour</span>
      <span>❯</span>
    </div>
    </Link>
  );
}

export default DailyGame;
