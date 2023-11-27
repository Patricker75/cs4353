import "./NavBar.css";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Get the current location

  const shouldShowNavBar = !["/", "/register"].includes(location.pathname);

  return (
    shouldShowNavBar && (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Your Profile</NavLink>
        <NavLink to="/fuel">Fuel Request Form</NavLink>
        <NavLink to="/display">Fuel Request History</NavLink>
      </nav>
    )
  );
};

export default NavBar;
