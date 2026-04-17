import "./ChoiceGame.css";

function ChoiceGame({ gameName, iconGame }) {
  return (
    <div className="container-game">
      <div className="icon-container-game">
        <img src={iconGame} alt={gameName} className="icon-game" />
        </div>
      <div className="container-name-game">{gameName}</div>
    </div>
  )
}

export default ChoiceGame
