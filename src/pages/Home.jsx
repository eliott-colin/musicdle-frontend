import React from "react";
import ChoiceGame from "../components/ChoiceGame";
import DailyGame from "../components/DailyGame";
import GameMode from "../components/GameModeCard"

function Home() {
  return (
    <main className="page-home">
      <div className="container-all-games">
        <div><DailyGame /></div>
        <div><GameMode mode="Mode Solo" description="Lance une partie en solo" /></div>
        <div><GameMode mode="Mode battle" description="Lance une partie en ligne ou en local" /></div>
        <div><GameMode mode="Mode quizz" description="Teste tes connaissances" /></div>
      </div>
    </main>
  );
}

export default Home;
