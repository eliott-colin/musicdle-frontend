import React from "react";
import ChoiceGame from "../components/ChoiceGame";
import DailyGame from "../components/DailyGame";

function Home() {
  return (
    <>
      <h1 className="main-title">Musicdle</h1>
      <div className="container-all-games">
        <p>Blabla</p>
        <ChoiceGame
          gameName="Morceau du jour"
          iconGame="/musicdle/images/headphone.png"
        />
        <div><DailyGame /></div>
      </div>
    </>
  );
}

export default Home;
