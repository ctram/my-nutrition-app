import React from 'react';
import '../styles/App.css';

import NavBar from './NavBar';
import MealStats from './MealStats';
import Modal from './Modal';

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
      exercises: []
    };
  }

  componentDidMount() {
    const { date, foods: { breakfast, lunch, dinner, snacks } } = mockData;

    this.setState({
      date, breakfast, lunch, dinner, snacks
    });
  }

  render() {
    const { breakfast, lunch, dinner, snacks, date } = this.state;

    return (
      <div className="App">
        <NavBar />
        {/*
          <Modal title="xxxxx">
          asdasdasd
          </Modal>
        */}

        <div className="main-content p-3">
          <div className="py-3">
            <MealStats name="breakfast" items={breakfast.items} />
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
