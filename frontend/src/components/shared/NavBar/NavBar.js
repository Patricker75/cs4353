import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const navbarStyle = {
  backgroundColor: "#4B0082", // Dark purple color
  display: "flex",
  justifyContent: "space-evenly", // Evenly spaced links
  alignItems: "center",
  position: "fixed",
  top: "0",
  left: "0", // Fixed to the top left
  width: "100%",
  zIndex: "1000",
  borderBottom: "1px solid white", // Add a border line
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px 20px", // Adjust padding for size
  fontSize: "20px", // Adjust font size
  fontFamily: "Arial, sans-serif", // Use your preferred font
  borderRight: "1px solid white", // Add a right border
};

const NavBar = () => {
  const location = useLocation(); // Get the current location

  const shouldShowNavBar = !["/", "/register"].includes(location.pathname);

  return (
    shouldShowNavBar && (
      <nav style={navbarStyle}>
        <NavLink to="/" style={{ ...navLinkStyle, paddingLeft: "0" }}>
          Home
        </NavLink>
        <NavLink to="/profile" style={navLinkStyle}>
          Your Profile
        </NavLink>
        <NavLink to="/fuel" style={navLinkStyle}>
          Fuel Request Form
        </NavLink>
        <NavLink to="/display" style={navLinkStyle}>
          Fuel Request History
        </NavLink>
      </nav>
    )
  );
};

export default NavBar;
