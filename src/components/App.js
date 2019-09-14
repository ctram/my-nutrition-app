import React from "react";
import moment from "moment";
import capitalize from "capitalize";

import "../styles/App.css";

import { DATE_FORMAT } from "../constants/constants";

import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import NavBar from "./NavBar";
import PageDay from "../pages/PageDay";
import PageAddFoodToLibrary from "../pages/PageAddFoodToLibrary";
import PageAddExerciseToLibrary from "../pages/PageAddExerciseToLibrary";
import Toast from "../components/Toast";

import foodTemplatesData from "../mock-data/food-templates.json";
import exerciseTemplatesData from "../mock-data/exercise-templates.json";
import mockDays from "../mock-data/days.json";
import { newDayTemplate } from "../helpers/days";

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

    this.addFoodToMeal = this.addFoodToMeal.bind(this);
    this.addExerciseToDay = this.addExerciseToDay.bind(this);

    this.addFoodTemplateToLibrary = this.addFoodTemplateToLibrary.bind(this);
    this.addExerciseTemplateToLibrary = this.addExerciseTemplateToLibrary.bind(
      this
    );

    this.changeDate = this.changeDate.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    // clear toastMessage when user navigates to new path.
    this.props.history.listen(() => {
      this.setState({ toastMessage: "" });
    });

    // mimic a call to server for data.
    Promise.resolve().then(() => {
      const { days } = this.state;

      this.setState({
        foodTemplates: foodTemplatesData.foods,
        exerciseTemplates: exerciseTemplatesData.exercises,
        days: { ...days, ...mockDays }
      });
    });
  }

  changeDate(direction) {
    const { date, days } = this.state;
    const m = moment(date);

    if (direction === "prev") {
      m.subtract(1, "day");
    } else if (direction === "next") {
      m.add(1, "day");
    } else {
      console.error(
        `'${direction}' is not an expected direction; was expecting 'prev' or 'next'`
      );
    }

    const nextDate = m.format("YYYY-MM-DD");

    if (!days[nextDate]) {
      days[nextDate] = newDayTemplate();
    }

    this.setState({ date: nextDate, days });
  }

  addFoodToMeal(food, mealType) {
    const { foodTemplates, days, date } = this.state;

    const foodTemplate = foodTemplates.find(foodTemplate => {
      return foodTemplate.id === food.id;
    });

    const newFood = {
      ...foodTemplate,
      numberServings: food.numberServings,
      id: Math.random()
    };

    let day = days[date];

    day.foods[mealType].items.push(newFood);
    days[date] = day;

    const toastMessage = `${newFood.name} added to ${mealType}`;

    return new Promise(resolve => {
      this.setState({ days, toastMessage }, () => {
        this.scrollToTop();
        return resolve();
      });
    });
  }

  addExerciseToDay(exercise) {
    const { exerciseTemplates, days, date } = this.state;

    const exerciseTemplate = exerciseTemplates.find(exerciseTemplate => {
      return exerciseTemplate.id === exercise.id;
    });

    const newExercise = {
      ...exercise,
      name: exerciseTemplate.name,
      id: Math.random()
    };

    let day = days[date];

    day.exercises.push(newExercise);
    days[date] = day;

    const toastMessage = `${newExercise.name} exercise added`;

    return new Promise(resolve => {
      this.setState({ days, toastMessage }, () => {
        this.scrollToTop();
        return resolve();
      });
    });
  }

  addFoodTemplateToLibrary(food) {
    const {
      fat,
      protein,
      carbs,
      calories,
      name,
      servingUnit,
      servingSize
    } = food;
    const nutrition = { fat, protein, carbs, calories };

    const { foodTemplates } = this.state;
    const newFood = {
      name,
      id: Math.random(),
      servingUnit,
      servingSize,
      nutrition
    };
    foodTemplates.push(newFood);

    this.props.history.push("/");
    this.setState({
      foodTemplates,
      toastMessage: `${newFood.name} added to library`
    });
    this.scrollToTop();

    return Promise.resolve();
  }

  addExerciseTemplateToLibrary(exercise) {
    const { exerciseTemplates } = this.state;
    const { name } = exercise;

    // quick and dirty, generate a, hopefully, unique id for the exericse.
    // In real app, we'd send data to the server to create the exercise.
    const id = parseInt(Math.random() * 1000000000);

    exerciseTemplates.push({ id, name });

    this.props.history.push("/");
    this.setState({
      exerciseTemplates,
      toastMessage: `${exercise.name} added to library`
    });
    this.scrollToTop();
    return Promise.resolve();
  }

  removeItem(itemType, item) {
    const { name, id } = item;
    const { days, date } = this.state;

    const itemTypeLabel =
      itemType === "exercise" ? "Exercises" : capitalize.words(itemType);

    if (
      !window.confirm(
        `Are you sure you want to remove ${capitalize.words(
          name
        )} from ${itemTypeLabel}? This cannot be undone.`
      )
    ) {
      return;
    }

    const day = days[date];

    let items =
      itemType === "exercise" ? day.exercises : day.foods[itemType].items;

    items = items.filter(item => {
      return item.id !== id;
    });

    if (itemType === "exercise") {
      day.exercises = items;
    } else {
      day.foods[itemType].items = items;
    }

    days[date] = day;

    this.setState({ days });
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const {
      foodTemplates,
      toastMessage,
      days,
      date,
      exerciseTemplates
    } = this.state;

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
                <PageAddFoodToLibrary
                  onSubmitFoodTemplate={this.addFoodTemplateToLibrary}
                />
              )}
            />
            <Route
              path="/add-exercise-to-library"
              render={() => (
                <PageAddExerciseToLibrary
                  onSubmitExerciseTemplate={this.addExerciseTemplateToLibrary}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <PageDay
                  foodTemplates={foodTemplates}
                  exerciseTemplates={exerciseTemplates}
                  days={days}
                  date={date}
                  onAddFoodToMeal={this.addFoodToMeal}
                  onAddExerciseToDay={this.addExerciseToDay}
                  onChangeDate={this.changeDate}
                  onRemoveItem={this.removeItem}
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
