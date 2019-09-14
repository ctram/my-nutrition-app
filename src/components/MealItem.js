import React from "react";

import { MEASURING_UNITS_LABELS } from "../constants/constants";

function MealItem(props) {
  const { onClickClose } = props;
  const {
    name,
    servingUnit,
    servingSize,
    numberServings,
    nutrition,
    id
  } = props.item;
  const { calories } = nutrition;

  const servingSizeUnitLabel = MEASURING_UNITS_LABELS[servingUnit];
  const totalPortion = `${(
    servingSize * numberServings
  ).toLocaleString()} ${servingSizeUnitLabel}`;

  const details = { ...nutrition };
  delete details["calories"];

  let domDetails = [];

  for (const attr in details) {
    const value = nutrition[attr];

    domDetails.push(
      <div key={`${attr}-${value}`} className="d-flex justify-content-between">
        <span className="text-capitalize">{attr}</span>
        <span>{(numberServings * value).toLocaleString()} g</span>
      </div>
    );
  }

  return (
    <li className="list-group-item">
      <div className="text-right mb-3">
        <button
          onClick={() => onClickClose({ name, id })}
          type="button"
          className="close"
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold text-capitalize">{name}</span>
        <span>{totalPortion}</span>
      </div>
      <hr />
      {domDetails}
      <hr />
      <div className="d-flex justify-content-between">
        <span className="text-capitalize">Calories</span>
        <span>{(calories * numberServings).toLocaleString()}</span>
      </div>
    </li>
  );
}

export default MealItem;
