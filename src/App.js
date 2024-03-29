import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
// Drinks
import DrinksCategories from "./Components/Drinks/DrinksCategories/DrinksCategories";
import DrinksCategory from "./Components/Drinks/DrinksCategory/DrinksCategory";
import CoffeeTea from "./Components/Drinks/DrinksCategory/CoffeeTea";
import Other from "./Components/Drinks/DrinksCategory/Other";
import PunchPartyCategory from "./Components/Drinks/DrinksCategory/PunchPartyCategory";
import DrinksDetails from "./Components/Drinks/DrinksDetails/DrinksDetails";
import DrinksFunCorner from "./Components/Drinks/DrinksFunCorner/DrinksFunCorner";
import MainIngredient from "./Components/Drinks/DrinksSearches/ByMainIngredient";
import FirstLetter from "./Components/Drinks/DrinksSearches/FirstLetter";
import Name from "./Components/Drinks/DrinksSearches/Name";
import Glass from "./Components/Drinks/DrinksSearches/Glass";
import ByAlcohol from "./Components/Drinks/DrinksSearches/ByAlcohol";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meals_categories" element={<Categories />} />
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
        {/* Drinks */}
        <Route path="/drinks_categories" element={<DrinksCategories />} />
        <Route
          path="/drinks_categories/:category"
          element={<DrinksCategory />}
        />
        <Route path="/drinks_categories/Coffee / Tea" element={<CoffeeTea />} />
        <Route path="/drinks_categories/Other / Unknown" element={<Other />} />
        <Route
          path="/drinks_categories/Punch / Party Drink"
          element={<PunchPartyCategory />}
        />
        <Route
          path="/drinks_categories/:category/:id"
          element={<DrinksDetails />}
        />
        <Route path="/drinks_fun_corner" element={<DrinksFunCorner />} />
        <Route path="/drinks_main_ingredient" element={<MainIngredient />} />
        <Route path="/drinks_first_letter" element={<FirstLetter />} />
        <Route path="/drinks_name" element={<Name />} />
        <Route path="drinks_glass" element={<Glass />} />
        <Route path="drinks_alcoholic" element={<ByAlcohol />} />
      </Routes>
    </Router>
  );
};

export default App;
