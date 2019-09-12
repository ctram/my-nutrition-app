import React from 'react';

import '../styles/App.css';

import NavBar from './NavBar';
import MealStats from './MealStats';
import ModalAddFoodToMeal from './ModalAddFoodToMeal';

import mockData from '../mock-data/days.json';

import { newDayTemplate } from '../helpers/days';

class App extends React.Component {
  constructor(props) {
    super(props);

    const dateToday = new Date().toJSON().split('T')[0];
    const days = {};
    days[dateToday] = newDayTemplate();

    this.state = {
      date: dateToday,
      days,
      modalAddFoodVisible: false,
      modalAddExerciseVisible: false,
      mealTypeToAddItemTo: null,
      modalToShow: null
    };

    this.idModal = 'my-modal';

    this.idModalAddFood = 'modal-add-food-to-meal';
    this.idModalAddExercise = 'modal-add-exercise';
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModalAddFoodToMeal = this.showModalAddFoodToMeal.bind(this);
    this.addFoodToMeal = this.addFoodToMeal.bind(this);
  }

  componentDidMount() {
    // tap into jQuery to activate Bootstrap modal;
    window.$(`#${this.idModal}`)
      .modal({
        backdrop: 'static',
        show: false,
        focus: false
      });

    const { days } = this.state;

    this.setState({ days: { ...days, ...mockData } });
  }

  showModal(modalType) {
    this.setState({ modalToShow: modalType }, () => {
      window.$(`#${this.idModal}`).modal(!!modalType ? 'show' : 'hide');
    })
  }

  showModalAddFoodToMeal(mealType) {
    this.setState({ mealTypeToAddItemTo: mealType }, () => {
      this.showModal('modalAddFoodToMeal');
    });
  }

  closeModal() {
    this.showModal(null);
  }

  addFoodToMeal(food, mealType) {
    const { days, date } = this.state;

    let day = days[date];

    if (!day) {
      day = newDayTemplate();
    }

    day.foods[mealType].items.push(food);
    days[date] = day;

    this.setState({ days }, () => {
      this.showModal(null);
    })
  }

  render() {
    const { days, date, mealTypeToAddItemTo, modalToShow } = this.state;

    const day = days[date];
    const foods = day.foods;
    const { breakfast, lunch, dinner, snacks } = foods;

    const defaultModal = <ModalAddFoodToMeal
                            date={date}
                            mealType={mealTypeToAddItemTo}
                            onClickClose={this.closeModal}
                            onClickAddFoodToMeal={this.addFoodToMeal}
                          />;

    let domModal = null;

    switch (modalToShow) {
      case 'modalAddFoodToMeal':
        domModal = defaultModal
        break;
      default:
        domModal = defaultModal;
    }

    return (
      <div className="App">
        <NavBar />
        {domModal}
        <div className="main-content p-3">
          <div className="py-3">
            <MealStats
              name="breakfast"
              items={breakfast.items}
              onClickAddFood={this.showModalAddFoodToMeal} />
          </div>
          <div className="py-3">
            <MealStats name="lunch" items={lunch.items} />
          </div>
          <div className="py-3">
            <MealStats name="dinner" items={dinner.items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
