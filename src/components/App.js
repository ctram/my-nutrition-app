import React from 'react';

import '../styles/App.css';

import NavBar from './NavBar';
import MealStats from './MealStats';
import ModalAddFoodToMeal from './ModalAddFoodToMeal';

import mockData from '../mock-data/days.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      breakfast: {},
      lunch: {},
      dinner: {},
      snacks: [],
      exercises: [],
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
  }

  componentDidMount() {
    // tap into jQuery to activate Bootstrap modal;
    window.$(`#${this.idModal}`)
      .modal({
        backdrop: 'static',
        show: false,
        focus: false
      });

    // Here we would normally call the server for data to render onto the UI,
    // but instead, let's just render the mock data.
    const { date } = this.state;

    let foods;

    if (date) {
      foods = mockData[date].foods
    } else {
      let firstDate = Object.keys(mockData)[0];
      foods = mockData[firstDate].foods;
    }

    const { breakfast, lunch, dinner, snacks } = foods;

    this.setState({
      date, breakfast, lunch, dinner, snacks
    });
  }

  showModal(modalType) {
    window.$(`#${this.idModal}`).modal(!!modalType ? 'show' : 'hide');
    this.setState({ modalToShow: modalType });
  }

  closeModal() {
    this.showModal(null);
  }

  addFoodToMeal(food, mealType) {
    // const { breakfast, lunch}
  }

  render() {
    const { breakfast, lunch, dinner, snacks, date, mealTypeToAddItemTo, modalToShow } = this.state;

    const defaultModal = <ModalAddFoodToMeal
                            date={date}
                            mealType={mealTypeToAddItemTo}
                            onClickClose={this.closeModal}
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
              onClickAddFood={this.showModal} />
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
