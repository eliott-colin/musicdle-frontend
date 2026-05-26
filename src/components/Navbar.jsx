import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import ConnexionButton from "./ConnexionButton";

function Navbar() {
  // useState start false -> my nav bar is not open
  const [navIsOpen, setNavIsOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

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

        <img
          src={`${import.meta.env.BASE_URL}images/MUSICDLE-logo.png`}
          alt="logo"
          className="navbar-logo"
        />
        <div>
          <Link to="/register">
            <img
              src={`${import.meta.env.BASE_URL}images/bee.png`}
              alt="Connexion"
              className="nav-connexion"
            />
          </Link>
        </div>
      </nav>

      <div id="sidebar" data-action={navIsOpen}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li className={getLinkClass("/")}>
              <Link to="/">Accueil</Link>
            </li>
            <li className={getLinkClass("/register")}>
              <Link to="/register">Jeu du jour</Link>
            </li>
            <li className={getLinkClass("/choice")}>
              <Link to="/choice">Mode libre</Link>
            </li>
            <li className={getLinkClass("/profil")}>
              <Link to="/profil">Profil</Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <ConnexionButton text="Connexion ou inscription" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
