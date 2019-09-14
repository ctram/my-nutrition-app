import React from "react";

import ModalAddItem from "./ModalAddItem";

function ModalAddFoodToMeal(props) {
  const { onClickClose, foodTemplates, onSubmitFoodToMeal } = props;

  let domOptions = [<option key={-1} value={""} label="Select A Food" />];

  if (foodTemplates && foodTemplates.length > 0) {
    const _foodTemplates = foodTemplates.map((foodTemplate, idx) => {
      const { name, servingSize, servingUnit, id } = foodTemplate;

      return (
        <option
          key={idx}
          value={id}
          label={`${name} (${servingSize} ${servingUnit})`}
        />
      );
    });

    domOptions = domOptions.concat(_foodTemplates);
  }

  const dataAttributeIds = {
    id: "select-food-id",
    numberServings: "input-number-servings"
  };

  return (
    <ModalAddItem
      onClickClose={onClickClose}
      submitButtonLabel="Add Food To Meal"
      formId="form-add-food-to-meal"
      dataAttributeIds={dataAttributeIds}
      onSubmit={onSubmitFoodToMeal}
      modalTitle="Add Food To Meal"
    >
      <div className="form-group">
        <label htmlFor="select-food">Food Name</label>
        <select
          data-attr-name="id"
          defaultValue=""
          id={dataAttributeIds.id}
          className="form-control text-capitalize"
          required
        >
          {domOptions}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="input-number-servings">Number of Servings</label>
        <input
          data-attr-name="numberServings"
          defaultValue="1"
          min="1"
          id={dataAttributeIds.numberServings}
          type="number"
          className="form-control"
        />
      </div>
    </ModalAddItem>
  );
}

export default ModalAddFoodToMeal;
