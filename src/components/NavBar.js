import React from "react";

import { Link, withRouter } from "react-router-dom";

function NavBar(props) {
  const {
    history: {
      location: { pathname }
    }
  } = props;

  const paths = {
    addFoodToLibrary: "/add-food-to-library",
    addExerciseToLibrary: "/add-exercise-to-library"
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        My Nutrition App
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${
              pathname === paths.addFoodToLibrary ? "active" : ""
            }`}
          >
            <Link to={paths.addFoodToLibrary} className="nav-link">
              Add Food To Library
            </Link>
          </li>
          <li
            className={`nav-item ${
              pathname === paths.addExerciseToLibrary ? "active" : ""
            }`}
          >
            <Link to={paths.addExerciseToLibrary} className="nav-link">
              Add Exercise To Library
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
