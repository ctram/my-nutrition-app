import React from 'react';
import moment from 'moment';

import NavDate from '../components/NavDate';
import MealStats from '../components/MealStats';
import ModalAddFoodToMeal from '../components/ModalAddFoodToMeal';
import ModalAddFoodToLibrary from '../components/ModalAddFoodToLibrary';

import mockData from '../mock-data/days.json';

import { newDayTemplate } from '../helpers/days';
import { DATE_FORMAT } from '../constants/base';

class PageDay extends React.Component {
  constructor(props) {
    super(props);

    const dateToday = moment().format(DATE_FORMAT);
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
    this.showModalAddFoodToLibrary = this.showModalAddFoodToLibrary.bind(this);
    this.addFoodToMeal = this.addFoodToMeal.bind(this);
    this.changeDate = this.changeDate.bind(this);
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
    if (modalType !== this.state.modalToShow) {
      window.$(`#${this.idModal}`).modal('hide');
    }

    this.setState({ modalToShow: modalType }, () => {
      window.$(`#${this.idModal}`)
        .modal({
          backdrop: 'static',
          show: false,
          focus: false
        });

      window.$(`#${this.idModal}`).modal(!!modalType ? 'show' : 'hide');
    })
  }

  showModalAddFoodToMeal(mealType) {
    this.setState({ mealTypeToAddItemTo: mealType }, () => {
      this.showModal('modalAddFoodToMeal');
    });
  }

  showModalAddFoodToLibrary() {
    this.showModal('modalAddFoodToLibrary');
  }

  closeModal() {
    this.showModal(null);
  }

  addFoodToMeal(food, mealType) {
    const { days, date } = this.state;

    let day = days[date];

    day.foods[mealType].items.push(food);
    days[date] = day;

    return new Promise(resolve => {
      this.setState({ days }, () => {
        this.showModal(null);
        return resolve();
      })
    });
  }

  changeDate(direction) {
    const { date, days } = this.state;
    const m = moment(date);

    if (direction === 'prev') {
      m.subtract(1, 'day');
    } else if (direction === 'next') {
      m.add(1, 'day');
    } else {
      console.error(`'${direction}' is not an expected direction; was expecting 'prev' or 'next'`);
    }

    const nextDate = m.format('YYYY-MM-DD');

    if (!days[nextDate]) {
      days[nextDate] = newDayTemplate();
    }

    this.setState({ date: nextDate, days });
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
                            onClickAddFoodToLibrary={this.showModalAddFoodToLibrary}
                          />;

    let domModal = null;

    switch (modalToShow) {
      case 'modalAddFoodToMeal':
        domModal = defaultModal
        break;
      case 'modalAddFoodToLibrary':
        domModal = (
          <ModalAddFoodToLibrary
            onClickClose={this.closeModal}
            onClickBackToMeal={this.backToMeal}
            onClickAddFoodToLibray={this.addFoodToLibrary}
          />
        );
        break;
      default:
        domModal = defaultModal;
    }

    return (
      <div className="day">
        {domModal}
        <NavDate
          date={date}
          onChangeDate={this.changeDate}
        />
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
      </div>
    );
  }
}

export default PageDay;