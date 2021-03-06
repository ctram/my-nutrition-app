import React from "react";

import NavDate from "../components/NavDate";
import MealStats from "../components/MealStats";
import Exercises from "../components/Exercises";
import ModalAddFoodToMeal from "../components/ModalAddFoodToMeal";
import ModalAddExerciseToDay from "../components/ModalAddExerciseToDay";

import { newDayTemplate } from "../helpers/days";

class PageDay extends React.Component {
  constructor(props) {
    super(props);

    const { foodTemplates, days, date, exerciseTemplates } = props;

    if (!days[date]) {
      days[date] = newDayTemplate();
    }

    this.state = {
      foodTemplates,
      exerciseTemplates,
      days,
      date,
      mealTypeToAddItemTo: null,
      modalToShow: null
    };

    this.idModal = "my-modal";

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.showModalAddFoodToMeal = this.showModalAddFoodToMeal.bind(this);
    this.showModalAddExerciseToDay = this.showModalAddExerciseToDay.bind(this);

    this.handleAddFoodToMeal = this.handleAddFoodToMeal.bind(this);
    this.handleAddExerciseToDay = this.handleAddExerciseToDay.bind(this);
  }

  componentDidMount() {
    // tap into jQuery to activate Bootstrap modal;
    window.$(`#${this.idModal}`).modal({
      backdrop: "static",
      show: false,
      focus: false
    });
  }

  componentDidUpdate(prevProps) {
    const {
      foodTemplates: prevFoodTemplates,
      days: prevDays,
      date: prevDate,
      exerciseTemplates: prevExerciseTemplates
    } = prevProps;

    const { foodTemplates, days, date, exerciseTemplates } = this.props;

    if (
      prevFoodTemplates !== foodTemplates ||
      prevDays !== days ||
      prevDate !== date ||
      prevExerciseTemplates !== exerciseTemplates
    ) {
      this.setState({ foodTemplates, days, date, exerciseTemplates });
    }
  }

  showModal(modalType) {
    if (modalType !== this.state.modalToShow) {
      window.$(`#${this.idModal}`).modal("hide");
    }

    this.setState({ modalToShow: modalType }, () => {
      window.$(`#${this.idModal}`).modal({
        backdrop: "static",
        show: false,
        focus: false
      });

      window.$(`#${this.idModal}`).modal(!!modalType ? "show" : "hide");
    });
  }

  showModalAddFoodToMeal(mealType) {
    this.setState({ mealTypeToAddItemTo: mealType }, () => {
      this.showModal("modalAddFoodToMeal");
    });
  }

  showModalAddExerciseToDay() {
    this.showModal("modalAddExerciseToDay");
  }

  closeModal() {
    this.showModal(null);
  }

  handleAddFoodToMeal(food) {
    const { mealTypeToAddItemTo } = this.state;

    this.props.onAddFoodToMeal(food, mealTypeToAddItemTo).then(() => {
      this.showModal(null);
    });
  }

  handleAddExerciseToDay(exercise) {
    this.props.onAddExerciseToDay(exercise).then(() => {
      this.showModal(null);
    });
  }

  render() {
    const {
      days,
      date,
      modalToShow,
      foodTemplates,
      exerciseTemplates
    } = this.state;

    const { onChangeDate, onRemoveItem } = this.props;

    const day = days[date];

    const { foods, exercises } = day;
    const { breakfast, lunch, dinner, snacks } = foods;

    const modalAddFoodToMeal = (
      <ModalAddFoodToMeal
        onClickClose={this.closeModal}
        onSubmitFoodToMeal={this.handleAddFoodToMeal}
        foodTemplates={foodTemplates}
      />
    );

    const modalAddExerciseToDay = (
      <ModalAddExerciseToDay
        onSubmitExerciseToDay={this.handleAddExerciseToDay}
        onClickClose={this.closeModal}
        exerciseTemplates={exerciseTemplates}
      />
    );

    let domModal = null;

    switch (modalToShow) {
      case "modalAddFoodToMeal":
        domModal = modalAddFoodToMeal;
        break;
      case "modalAddExerciseToDay":
        domModal = modalAddExerciseToDay;
        break;
      default:
        domModal = null;
    }

    return (
      <div className="page-day page-responsive-width">
        {domModal}
        <NavDate date={date} onChangeDate={onChangeDate} />
        <div className="py-3">
          <MealStats
            name="breakfast"
            items={breakfast.items}
            onClickAddFood={this.showModalAddFoodToMeal}
            onClickCloseItem={onRemoveItem}
          />
        </div>
        <div className="py-3">
          <MealStats
            name="lunch"
            items={lunch.items}
            onClickAddFood={this.showModalAddFoodToMeal}
            onClickCloseItem={onRemoveItem}
          />
        </div>
        <div className="py-3">
          <MealStats
            name="dinner"
            items={dinner.items}
            onClickAddFood={this.showModalAddFoodToMeal}
            onClickCloseItem={onRemoveItem}
          />
        </div>
        <div className="py-3">
          <MealStats
            name="snacks"
            items={snacks.items}
            onClickCloseItem={onRemoveItem}
            onClickAddFood={this.showModalAddFoodToMeal}
          />
        </div>
        <div className="py-3">
          <Exercises
            exercises={exercises}
            onClickAddExercise={this.showModalAddExerciseToDay}
            onClickCloseItem={onRemoveItem}
          />
        </div>
      </div>
    );
  }
}

export default PageDay;
