import React from "react";
import { useNavigate } from "react-router-dom";

// import "./navbar.css";
import logo from "../../../assets/logo.jpeg";

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
          <ul className="nav_list">
            <li onClick={handleHome}>Home</li>
            <li onClick={handleAbout}>About</li>
            {type === "category" ||
            type === "drink_details" ||
            type === "fun_corner" ? (
              <li onClick={handleCategories}>Categories</li>
            ) : null}
            <li onClick={handleFunCorner}>Fun Corner</li>
          </ul>
        </nav>
      </div>
      <div id="toggle" onClick={handleToggle}></div>
    </header>
  );
};

export default DrinksNavigation;
