import React from 'react';

const SERVING_SIZE_UNIT_LABELS = {
  'ounce': 'oz',
  'pound': 'lbs',
  'kilogram': 'kg',
  'gram': 'g',
  'milligram': 'mg'
};

function MealItem(props) {
  const { name, servingSizeUnit, servingSize, quantityOfServings, nutrition } = props.item;
  const { fat, protein, carbs, calories } = nutrition;

  const servingSizeUnitLabel = SERVING_SIZE_UNIT_LABELS[servingSizeUnit];
  const totalPortion = `${servingSize * quantityOfServings} ${servingSizeUnitLabel}`

  const details = { ...nutrition };
  delete details['calories']

  let domDetails = [];

  for (const attr in details) {
    domDetails.push(
      <div className="d-flex justify-content-between">
        <span className="text-capitalize">
          {attr}
        </span>
        <span>
          {nutrition[attr]} g
        </span>
      </div>
    );
  }

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold">
          {name}
        </span>
        <span>
          {totalPortion}
        </span>
      </div>
      <hr />
      {domDetails}
      <hr />
      <div>
        {calories} Calories
      </div>
    </li>
  );
}

export default MealItem;
