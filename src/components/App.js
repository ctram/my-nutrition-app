import React from "react";

import NavBar from "./NavBar";

import PageDay from "../pages/PageDay";
import PageAddFoodToLibrary from "../pages/PageAddFoodToLibrary";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import foodTemplatesData from "../mock-data/food-templates.json";

import "../styles/App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="main-content p-3">
            <Switch>
            <Route path="/add-food-to-library" component={PageAddFoodToLibrary} />
            <Route path="/" component={PageDay} />
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
