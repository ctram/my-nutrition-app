import React from 'react';

import '../styles/MealStats.css';

import MealItem from './MealItem';

import { sumItemStats } from '../helpers/calculations';

function MealStats(props) {
  const { name, items } = props;

  let domItems = null;
  let domTotalMealStats = null;

  if (items) {
    domItems = items.map((item) => {
      return <MealItem key={item.id} item={item} />;
    });

    domItems = (
      <ul class="list-group list-group-flush">
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
    </div>
  );
}

export default MealStats;
