import { useNavigate } from "react-router-dom";
import "../connexionButton.css";

function LogoutButton({ children, text = "Déconnexion", className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children ?? text}
    </button>
  );
}

export default LogoutButton;