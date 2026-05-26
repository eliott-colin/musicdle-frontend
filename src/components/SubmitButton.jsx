import "./connexionButton.css";

function SubmitButton({ text, disabled }) {
  return (
    <button type="submit" className="connexion-button" disabled={disabled}>
      {text}
    </button>
  );
}

export default SubmitButton;
