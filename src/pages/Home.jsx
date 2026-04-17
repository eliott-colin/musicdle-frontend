import React from "react";
import ChoiceGame from "../components/ChoiceGame";

function Home() {
  return (
    <>
      <h1 className="main-title">Musicdle</h1>
      <ChoiceGame
        gameName="Morceau du jour"
        iconGame="/musicdle/images/headphone.png"
      />
      <div>Jeu 2</div>
      <div>Jeu 3</div>
    </>
  );
}

export default Home;
