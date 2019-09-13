import React from "react";

import NavBar from "./NavBar";

import PageDay from "../pages/PageDay";
import PageAddFoodToLibrary from "../pages/PageAddFoodToLibrary";
import Toast from "../components/Toast";

import { Route, Switch } from "react-router-dom";

import { withRouter } from "react-router";

import foodTemplatesData from "../mock-data/food-templates.json";

import moment from "moment";
import { DATE_FORMAT } from "../constants/constants";

import mockData from "../mock-data/days.json";

import "../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodTemplates: [],
      exerciseTemplates: [],
      toastMessage: "",
      days: {},
      date: moment().format(DATE_FORMAT)
    };

    this.addFoodToLibrary = this.addFoodToLibrary.bind(this);
    this.goToPageAddFoodToLibrary = this.goToPageAddFoodToLibrary.bind(this);
    this.addFoodToMeal = this.addFoodToMeal.bind(this);
  }

  componentDidMount() {
    // clear toastMessage when user navigates to new path.
    this.props.history.listen(() => {
      this.setState({ toastMessage: '' });
    });

    // mimick a call to server for data.
    Promise.resolve().then(() => {
      const { days } = this.state;

      this.setState({
        foodTemplates: foodTemplatesData.foods,
        days: { ...days, ...mockData }
      });
    });
  }

  addFoodToLibrary(food) {
    const { foodTemplates } = this.state;
    const newFood = { ...food, id: Math.random() };
    foodTemplates.push(newFood);

    this.props.history.push("/");
    this.setState({
      foodTemplates,
      toastMessage: `${newFood.name} added to library`
    });
    this.scrollToTop();
  }

  addFoodToMeal(food, mealType) {
    const { days, date } = this.state;

    let day = days[date];

    day.foods[mealType].items.push(food);
    days[date] = day;

    const toastMessage = `${food.name} added to ${mealType}`;

    return new Promise(resolve => {
      this.setState({ days, toastMessage }, () => {
        this.scrollToTop();
        return resolve();
      });
    });
  }

  goToPageAddFoodToLibrary() {
    this.props.history.push("/add-food-to-library");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setState({ toastMessage: "" });
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { foodTemplates, toastMessage, days, date, exerciseTemplates } = this.state;

    return (
      <div className="App">
        <NavBar />
        <div className="main-content px-3 py-5">
          {toastMessage && (
            <div className="mb-5">
              <Toast message={toastMessage} />
            </div>
          )}
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
                  exerciseTemplates={exerciseTemplates}
                  goToPageAddFoodToLibrary={this.goToPageAddFoodToLibrary}
                  days={days}
                  date={date}
                  onAddFoodToMeal={this.addFoodToMeal}
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
