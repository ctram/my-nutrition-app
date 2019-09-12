import React from "react";

import NavBar from "./NavBar";

import PageDay from "../pages/PageDay";
import PageAddFoodToLibrary from "../pages/PageAddFoodToLibrary";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import foodTemplatesData from "../mock-data/food-templates.json";

import "../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { foodTemplates: [] };

    this.addFoodToLibrary = this.addFoodToLibrary.bind(this);
  }

  componentDidMount() {
    Promise.resolve().then(() => {
      this.setState({ foodTemplates: foodTemplatesData.foods });
    });
  }

  addFoodToLibrary(food) {
    const { foodTemplates } = this.state;
    const newFood = { ...food, id: Math.random() };
    foodTemplates.push(newFood);
    this.setState({foodTemplates });
  }

  render() {
    const { foodTemplates } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="main-content p-3">
            <Switch>
              <Route
                path="/add-food-to-library"
                render={() => (
                  <PageAddFoodToLibrary
                    onSubmitNewFood={this.addFoodToLibrary}
                  />
                )}
              />
              <Route
                path="/"
                render={() => <PageDay foodTemplates={foodTemplates} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
