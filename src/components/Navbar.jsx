import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // useState start false -> my nav bar is not open
  const [navIsOpen, setNavIsOpen] = useState(false);
  // useLocation --> on what page i'm currently
  const location = useLocation();

  useEffect(() => {
    setNavIsOpen(false);
  }, [location]);
  // useEffect to close the sidebar menu when the page is restart

  // On click i wanna the burger to change and the side bar to slide
  const handleClick = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <>
      <nav className="bg-navbar">
        <ul
          id="hamburger-menu"
          onClick={handleClick}
          data-action={navIsOpen}>
          <li id="cross1"></li>
          <li></li>
          <li id="cross2"></li>
        </ul>

        <img
          src="/musicdle/public/images/MUSICDLE-logo.png"
          alt="logo"
          className="navbar-logo"
        />
      </nav>

      <div id="sidebar" data-action={navIsOpen}>
        <ul className="sidebar-menu">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/register">Jeu du jour</Link></li>
          <li><Link to="/choice">Mode libre</Link></li>
          <li><Link to="/profil">Profil</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
