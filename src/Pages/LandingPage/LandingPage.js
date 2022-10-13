import React from "react";
import "./landingPage.css";

const LandingPage = () => {
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
      <button className="landing_btn">Click here to know more...</button>
    </div>
  );
};

export default LandingPage;
