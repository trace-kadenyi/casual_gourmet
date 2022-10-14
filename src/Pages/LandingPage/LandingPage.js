import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <div className="landingPage">
      <h1 className="recipes">Recipes</h1>
      <p className="recipes_para">
        Become a casual gourmet in a few easy steps.
      </p>
      <h1 className="intro_heading">You too can cook...</h1>
      <p className="intro_para">
        Discover the joy of cooking (and making fancy drinks) right in your
        kitchen!
      </p>
      <button className="landing_btn" onClick={handleAbout}>Click here to know more...</button>
    </div>
  );
};

export default LandingPage;
