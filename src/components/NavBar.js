import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        My Nutrition App
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/add-food-to-library" className="nav-link">
              Add Food To Library
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-exercise-to-library" className="nav-link">
              Add Exercise To Library
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
