import React from "react";
import ChoiceGame from "../components/ChoiceGame";

function Home() {
  return (
    <>
      <h1 className="main-title">Musicdle</h1>
      <div className="container-all-games">
        <ChoiceGame
          gameName="Morceau du jour"
          iconGame="/musicdle/images/headphone.png"
        />
        <div>
          <ChoiceGame
            gameName="Jaquette du jour"
            iconGame="/musicdle/images/music.png"
          />
        </div>
        <div>Jeu 3</div>
      </div>
    </>
  );
}

export default Home;
