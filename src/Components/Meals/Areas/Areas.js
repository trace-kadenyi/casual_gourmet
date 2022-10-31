import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import { fetchAreas } from "../../../Redux/Meals/areaslice";
import "./areas.css";

const Areas = () => {
  const { areas, loading } = useSelector((state) => state.areas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAreas());
  }, []);

  return (
    <section className="area_section">
      <h1 style={{ color: "red", textDecoration: "underline" }}>Areas</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="categories">
          {areas.map((area) => {
            return (
              <div className="category" key={area.strArea}>
                <h3>{area.strArea}</h3>

                <NavLink className="arrow" to={`/${area.strArea}`}>
                  <FaLongArrowAltRight />
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Areas;
