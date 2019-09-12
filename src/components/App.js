import React from 'react';

import '../styles/App.css';

import NavBar from './NavBar';
import MealStats from './MealStats';
import ModalAddFood from './ModalAddFood';
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
      mealTypeToAddItemTo: null
    };

    this.idModalAddFood = 'modal-add-food-to-meal';
    this.idModalAddExercise = 'modal-add-exercise';
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const { date, foods: { breakfast, lunch, dinner, snacks } } = mockData;

    window.$(`#${this.idModalAddFood}`)
      .modal({
        backdrop: 'static',
        show: false,
        focus: false
      });

    this.setState({
      date, breakfast, lunch, dinner, snacks
    });
  }

  toggleModal(type) {
    let { modalAddFoodVisible, modalAddExerciseVisible } = this.state;

    // tap into jQuery to activate Bootstrap's modal
    switch (type) {
      case 'breakfast':
      case 'lunch':
      case 'dinner':
      case 'snack':
        modalAddFoodVisible = !modalAddFoodVisible;
        window.$(`#${this.idModalAddFood}`).modal('toggle');
        break;
      case 'exercise':
        modalAddExerciseVisible = !modalAddExerciseVisible;
        window.$(`#${this.idModalAddExercise}`).modal('toggle');
        break;
      default:
    }

    this.setState({
      modalAddFoodVisible, modalAddExerciseVisible, mealTypeToAddItemTo: type
    });
  }

  render() {
    const { breakfast, lunch, dinner, snacks, date, mealTypeToAddItemTo } = this.state;

    return (
      <div className="App">
        <NavBar />
        <ModalAddFoodToMeal
          id={this.idModalAddFood}
          date={date}
          mealType={mealTypeToAddItemTo}
          onClickClose={this.toggleModal}
        />
        <div className="main-content p-3">
          <div className="py-3">
            <MealStats name="breakfast" items={breakfast.items} onClickAddFood={this.toggleModal} />
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
