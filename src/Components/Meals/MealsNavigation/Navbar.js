import React from "react";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
import logo from "../../../assets/logo.jpeg";

const Navbar = ({ type }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleFunCorner = () => {
    navigate("/fun_corner");
  };

  const handleCategories = () => {
    navigate("/meals_categories");
  };

  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" onClick={handleHome} />
      <nav>
        <ul className="nav_list">
          <li onClick={handleHome}>Home</li>
          <li onClick={handleAbout}>About</li>
          {type === "category" ||
          type === "meal_details" ||
          type === "fun_corner" ? (
            <li onClick={handleCategories}>Categories</li>
          ) : null}
          <li onClick={handleFunCorner}>Fun Corner</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
