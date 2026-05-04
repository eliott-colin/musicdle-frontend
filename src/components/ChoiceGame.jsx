import "./ChoiceGame.css";

function ChoiceGame({ gameName, iconGame }) {
  return (
    <div className="container-game">
      <div className="icon-container-game">
        <img
          src="/musicdle/images/musicdle-bg.png"
          alt="logo jeu"
          className="button-choice"
        />
        <div className="overlay-game">
          <img src={iconGame} alt={gameName} className="icon-game" />
          <div className="name-game">{gameName}</div>
        </div>
      </div>
    </div>
  );
}

export default ChoiceGame;
