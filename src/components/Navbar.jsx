import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import ConnexionButton from "./ConnexionButton";
import LogoutButton from "./Logout/Logout";

function Navbar() {
  // useState start false -> my nav bar is not open
  const [navIsOpen, setNavIsOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    setNavIsOpen(false);
    setActivePath(location.pathname);
  }, [location]);

  const getLinkClass = (path) => (activePath === path ? "active-link" : "");

  // On click i wanna the burger to change and the side bar to slide
  const handleClick = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <>
      <nav className="bg-navbar">
        <ul id="hamburger-menu" onClick={handleClick} data-action={navIsOpen}>
          <li id="cross1"></li>
          <li></li>
          <li id="cross2"></li>
        </ul>

        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}images/MUSICDLE-logo.png`}
            alt="logo"
            className="navbar-logo"
          />
        </Link>
        <div>
          {isAuthenticated ? (
            <LogoutButton className="nav-logout">
              <img
                src={`${import.meta.env.BASE_URL}images/bee.png`}
                alt="Déconnexion"
                className="nav-connexion"
              />
            </LogoutButton>
          ) : (
            <Link to="/register">
              <img
                src={`${import.meta.env.BASE_URL}images/bee.png`}
                alt="Connexion"
                className="nav-connexion"
              />
            </Link>
          )}
        </div>
      </nav>

      <div id="sidebar" data-action={navIsOpen}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li className={getLinkClass("/")}>
              <Link to="/">Accueil</Link>
            </li>
            <li className={getLinkClass("/games/classic")}>
              <Link to="/games/classic">Jeu du jour</Link>
            </li>
            <li className={getLinkClass("/research")}>
              <Link to="/research">Mode libre</Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className={getLinkClass("/login")}>
                  <Link to="/login">Connexion</Link>
                </li>
                <li className={getLinkClass("/register")}>
                  <Link to="/register">Inscription</Link>
                </li>
              </>
            ) : (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>

        <div className="sidebar-footer">
          {!isAuthenticated ? (
            <Link to="/register">
              <ConnexionButton text="Connexion ou inscription" />
            </Link>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
