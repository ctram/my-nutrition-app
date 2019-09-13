import React from "react";

import NavBar from "./NavBar";

import PageDay from "../pages/PageDay";
import PageAddFoodToLibrary from "../pages/PageAddFoodToLibrary";

import { Route, Switch } from "react-router-dom";

import { withRouter } from "react-router";

import foodTemplatesData from "../mock-data/food-templates.json";

import "../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { foodTemplates: [] };

    this.addFoodToLibrary = this.addFoodToLibrary.bind(this);
    this.goToPageAddFoodToLibrary = this.goToPageAddFoodToLibrary.bind(this);
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
    ;

    this.props.history.push("/");
    this.setState({ foodTemplates });
  }

  goToPageAddFoodToLibrary() {
    this.props.history.push("/add-food-to-library");
  }

  render() {
    const { foodTemplates } = this.state;

    return (
      <div className="App">
        <NavBar />
        <div className="main-content px-3 py-5">
          <Switch>
            <Route
              path="/add-food-to-library"
              render={() => (
                <PageAddFoodToLibrary onSubmitNewFood={this.addFoodToLibrary} />
              )}
            />
            <Route
              path="/"
              render={() => (
                <PageDay
                  foodTemplates={foodTemplates}
                  goToPageAddFoodToLibrary={this.goToPageAddFoodToLibrary}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
