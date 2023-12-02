import "./NavBar.module.css";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const shouldShowNavBar = ["/profile","/fuel", "/display"].includes(location.pathname);

  const handleLogout = () => {
    dispatch({
      type: "logout",
    });
  };

  return (
    shouldShowNavBar && (
      <nav>
        <NavLink to="/profile">Your Profile</NavLink>
        <NavLink to="/fuel">Fuel Request Form</NavLink>
        <NavLink to="/display">Fuel Request History</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    )
  );
  //<NavLink to="/">Home</NavLink> - taken out because it is unsuitable for the purpose of navbar
};

export default NavBar;
