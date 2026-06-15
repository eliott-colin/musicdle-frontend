import { useNavigate } from "react-router-dom";

function LogoutButton({ className = "", children, text = "Déconnexion" }) {
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