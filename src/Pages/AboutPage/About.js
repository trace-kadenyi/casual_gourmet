import React from "react";
import { useNavigate } from "react-router-dom";
import "./about.css";
import logo from "../../assets/logo.jpeg";

const About = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleMeals = () => {
    navigate("/meals_categories");
  };

  const handleDrinks = () => {
    navigate("/drinks");
  };

  return (
    <div className="about_page">
      <header className="about_header">
        <img src={logo} alt="logo" className="logo" onClick={handleHome} />
        <nav className="about_nav">
          <ul>
            <li onClick={handleMeals}>Meals Recipes</li>
            <li onClick={handleDrinks}>Drinks Recipes</li>
          </ul>
        </nav>
      </header>
      <div className="about_content">
        <p>The in-laws are coming into town tomorrow...</p>
        <p>
          It’s the third date, and you’re making her dinner. And hoping to
          follow it up with breakfast in bed...{" "}
        </p>
        <p>It's your turn to host your book club...</p>
        <p>
          Your perfect sister invited herself and her fiance (the doctor) to
          dinner...
        </p>
        <p>
          Your son volunteered you to make cupcakes for the entire class....
        </p>
        <p><span className="panic">Don't panic</span></p>
        <p>
          No matter how busy you are, how overwhelmed, how inexperienced you
          might be in the kitchen, it’s going to be fine. In fact, it’s going to
          be spectacular. This recipes-app will walk you through it every step
          of the way.
        </p>
        <p>
          From the sumptuous to the casual, from tailgate parties to elegant
          dining and everything in between, you’re about to become a{" "}
          <span className="span">Casual Gourmet...</span>
        </p>
      </div>
    </div>
  );
};

export default About;
