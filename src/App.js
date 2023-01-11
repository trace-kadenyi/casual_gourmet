import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cocktails from "./Components/Drinks/Cocktails";
import RegularDrinks from "./Components/Drinks/RegularDrinks";
import LandingPage from "./Pages/LandingPage/LandingPage";
import About from "./Pages/AboutPage/About";
import Category from "./Components/Meals/Category/Category";
import Categories from "./Components/Meals/Categories/Categories";
import MealDetails from "./Components/Meals/MealDetails/MealDetails";
import Areas from "./Components/Meals/Areas/Areas";
import MealsPerArea from "./Components/Meals/Searches/MealsPerArea";
import FunCorner from "./Components/Meals/FunCorner/FunCorner";
import ByMainIngredient from "./Components/Meals/Searches/ByMainIngredient";
import ByFirstLetter from "./Components/Meals/Searches/ByFirstLetter";
import ByName from "./Components/Meals/Searches/ByName";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meals_categories" element={<Categories />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/regular" element={<RegularDrinks />} />
        <Route path="/about" element={<About />} />
        <Route path="/meals_categories/:category" element={<Category />} />
        <Route
          path="/meals_categories/:category/:id"
          element={<MealDetails />}
        />
        <Route path="/areas" element={<Areas />} />
        <Route path="/areas/:area" element={<MealsPerArea />} />
        <Route path="/fun_corner" element={<FunCorner />} />
        <Route path="/main_ingredient" element={<ByMainIngredient />} />
        <Route path="/first_letter" element={<ByFirstLetter />} />
        <Route path="/name" element={<ByName />} />
      </Routes>
    </Router>
  );
};

export default App;
