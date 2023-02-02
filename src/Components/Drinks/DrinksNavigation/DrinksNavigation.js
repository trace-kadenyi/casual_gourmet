import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/logo.jpeg";
import "./drinks_navigation.css";

const DrinksNavigation = ({ type }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleFunCorner = () => {
    navigate("/drinks_fun_corner");
  };

  const handleCategories = () => {
    navigate("/drinks_categories");
  };

  // toggle menu

  const handleToggle = () => {
    const toggle = document.getElementById("toggle");
    const toggler = document.getElementById("header_first_div");
    toggle.classList.toggle("active");
    toggler.classList.toggle("active");
  };

  return (
    <header className="header">
      <div id="header_first_div">
        <img className="logo" src={logo} alt="logo" onClick={handleHome} />
        <nav>
          <ul className="nav_list drinks_nav_list">
            <li onClick={handleHome} className="drinks_nav_li">
              Home
            </li>
            <li onClick={handleAbout} className="drinks_nav_li">
              About
            </li>
            {type === "category" ||
            type === "drink_details" ||
            type === "fun_corner" ? (
              <li onClick={handleCategories} className="drinks_nav_li">
                Categories
              </li>
            ) : null}
            <li onClick={handleFunCorner} className="drinks_nav_li">
              Fun Corner
            </li>
          </ul>
        </nav>
      </div>
      <div id="toggle" onClick={handleToggle}></div>
    </header>
  );
};

export default DrinksNavigation;
