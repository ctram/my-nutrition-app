import React from 'react';

const SERVING_SIZE_UNIT_LABELS = {
  'ounce': 'oz',
  'pound': 'lbs',
  'kilogram': 'kg',
  'gram': 'g',
  'milligram': 'mg'
};

function MealItem(props) {
  const { name, servingSizeUnit, servingSize, numberServings, nutrition } = props.item;
  const { calories } = nutrition;

  const servingSizeUnitLabel = SERVING_SIZE_UNIT_LABELS[servingSizeUnit];
  const totalPortion = `${servingSize * numberServings} ${servingSizeUnitLabel}`

  const details = { ...nutrition };
  delete details['calories']

  let domDetails = [];

  for (const attr in details) {
    const value = nutrition[attr];

    domDetails.push(
      <div key={`${attr}-${value}`} className="d-flex justify-content-between">
        <span className="text-capitalize">
          {attr}
        </span>
        <span>
          {value} g
        </span>
      </div>
    );
  }

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold text-capitalize">
          {name}
        </span>
        <span>
          {totalPortion}
        </span>
      </div>
      <hr />
      {domDetails}
      <hr />
      <div className="d-flex justify-content-between">
        <span className="text-capitalize">
          Calories
        </span>
        <span>
          {calories}
        </span>
      </div>
    </li>
  );
}

export default MealItem;
