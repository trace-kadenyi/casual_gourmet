import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Meals from "./Components/Meals/Meals";
import Cocktails from "./Components/Drinks/Cocktails";
import RegularDrinks from "./Components/Drinks/RegularDrinks";
import LandingPage from "./Pages/LandingPage/LandingPage";
import About from "./Pages/AboutPage/About";
import IndividualCategory from "./Components/Meals/IndividualCategory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/regular" element={<RegularDrinks />} />
        <Route path="/about" element={<About />} />
        <Route path="/meals/:category" element={<IndividualCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
