import React from 'react';

import '../styles/MealStats.css';

import MealItem from './MealItem';

import { sumItemStats } from '../helpers/calculations';

class MealStats extends React.Component {
  constructor(props) {
    super(props);

    this.onClickAddFood = this.onClickAddFood.bind(this);
  }

  onClickAddFood(e) {
    const { onClickAddFood, name } = this.props;
    onClickAddFood(name);
  }

  render() {
    const { name, items } = this.props;

    let domItems = null;
    let domTotalMealStats = null;

    if (items) {
      domItems = items.map((item, idx) => {
        return <MealItem key={item.id || idx} item={item} />;
      });

      domItems = (
        <ul className="list-group list-group-flush">
          {domItems}
        </ul>
      );



      // we can also do this summation in the map() above, but let's keep
      // code sepearate for ease of reading.
      const { fat, protein, carbs, calories } = sumItemStats(items);

      domTotalMealStats = (
        <div className="meal-stats-summary">
          <div className="d-flex justify-content-between">
            <div>
              <span>Fat: </span>
              <span>{fat}</span>
            </div>
            <div>
              <span>Protein: </span>
              <span>{protein}</span>
            </div>
            <div>
              <span>Carbs: </span>
              <span>{carbs}</span>
            </div>
          </div>
          <div>
            <span>Calories: </span>
            <span>{calories}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="meal-stats card">
        <div className="card-body">
          <h2 className="card-title text-capitalize">{name}</h2>
          {domTotalMealStats}
        </div>
        {domItems}
        <div className="card-footer text-muted">
          <button onClick={this.onClickAddFood} className="btn btn-primary" type="button">
            Add Food
          </button>
        </div>
      </div>
    );
  }
}

export default MealStats;
