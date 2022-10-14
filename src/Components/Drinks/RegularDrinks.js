import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRegularDrinks } from "../../Redux/Drinks/regularDrinksSlice";
import "./drinks.css";

const RegularDrinks = () => {
  const { regularDrinks, loading } = useSelector(
    (state) => state.regularDrinks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRegularDrinks());
  }, []);

  return (
    <div>
      <h1 style={{ textDecoration: "underline", color: "red" }}>
        Regular Drinks
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        regularDrinks.map((regular) => (
          <div key={regular.idDrink}>
            <h1>{regular.strDrink}</h1>
            <img
              src={regular.strDrinkThumb}
              alt={regular.strDrink}
              className="regularsImg"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default RegularDrinks;
