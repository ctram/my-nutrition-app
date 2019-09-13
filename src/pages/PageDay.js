import React from "react";
import moment from "moment";

import NavDate from "../components/NavDate";
import MealStats from "../components/MealStats";
import Exercises from "../components/Exercises";
import ModalAddFoodToMeal from "../components/ModalAddFoodToMeal";

import { newDayTemplate } from "../helpers/days";

class PageDay extends React.Component {
  constructor(props) {
    super(props);

    const { foodTemplates, days, date } = props;

    if (!days[date]) {
      days[date] = newDayTemplate();
    }

    this.state = {
      foodTemplates,
      days,
      date,
      modalAddFoodVisible: false,
      modalAddExerciseVisible: false,
      mealTypeToAddItemTo: null,
      modalToShow: null
    };

    this.idModal = "my-modal";

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModalAddFoodToMeal = this.showModalAddFoodToMeal.bind(this);
    this.goToPageAddFoodToLibrary = this.goToPageAddFoodToLibrary.bind(this);
    this.onClickAddFoodToMeal = this.onClickAddFoodToMeal.bind(this);
    this.changeDate = this.changeDate.bind(this);
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
      date: prevDate
    } = prevProps;

    const { foodTemplates, days, date } = this.props;

    if (
      prevFoodTemplates !== foodTemplates ||
      prevDays !== days ||
      prevDate !== date
    ) {
      this.setState({ foodTemplates, days, date });
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

  goToPageAddFoodToLibrary() {
    this.showModal(null);
    this.props.goToPageAddFoodToLibrary();
  }

  closeModal() {
    this.showModal(null);
  }

  onClickAddFoodToMeal(food, mealType) {
    const { onAddFoodToMeal } = this.props;

    return onAddFoodToMeal(food, mealType).then(() => {
      this.showModal(null);
      return Promise.resolve();
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

  render() {
    const {
      days,
      date,
      mealTypeToAddItemTo,
      modalToShow,
      foodTemplates
    } = this.state;

    const day = days[date];
    const foods = day.foods;
    const { breakfast, lunch, dinner, snacks } = foods;

    const defaultModal = (
      <ModalAddFoodToMeal
        date={date}
        mealType={mealTypeToAddItemTo}
        onClickClose={this.closeModal}
        onClickAddFoodToMeal={this.onClickAddFoodToMeal}
        onClickAddFoodToLibrary={this.goToPageAddFoodToLibrary}
        foodTemplates={foodTemplates}
      />
    );

    let domModal = null;

    switch (modalToShow) {
      case "modalAddFoodToMeal":
        domModal = defaultModal;
        break;
      default:
        domModal = defaultModal;
    }

    return (
      <div className="day">
        {domModal}
        <NavDate date={date} onChangeDate={this.changeDate} />
        <div className="py-3">
          <MealStats
            name="breakfast"
            items={breakfast.items}
            onClickAddFood={this.showModalAddFoodToMeal}
          />
        </div>
        <div className="py-3">
          <MealStats
            name="lunch"
            items={lunch.items}
            onClickAddFood={this.showModalAddFoodToMeal}
          />
        </div>
        <div className="py-3">
          <MealStats
            name="dinner"
            items={dinner.items}
            onClickAddFood={this.showModalAddFoodToMeal}
          />
        </div>
        <div className="py-3">
          <Exercises />
        </div>
      </div>
    );
  }
}

export default PageDay;
