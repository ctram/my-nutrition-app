import React from "react";

import FormAddGenericItem from "../components/FormAddGenericItem";

import { Link } from "react-router-dom";

import { MEASURING_UNITS_LABELS } from "../constants/constants";

function PageAddFoodToLibrary(props) {
  const { onSubmitFoodTemplate } = props;
  const formId = "form-add-food-to-library";

  const domServingUnitOptions = [
    <option key={-1} value="">
      Select A Unit
    </option>
  ];

  for (const fullLabel in MEASURING_UNITS_LABELS) {
    domServingUnitOptions.push(
      <option key={fullLabel} value={fullLabel}>
        {fullLabel}
      </option>
    );
  }

  const dataAttributeIds = {
    name: "input-food-name",
    servingSize: "input-food-serving-size",
    servingUnit: "select-food-serving-unit",
    fat: "input-food-fat",
    carbs: "input-food-carbs",
    protein: "input-food-protein",
    calories: "input-food-calories"
  };

  return (
    <div className="page-add-food-to-library page-responsive-width">
      <Link to="/" className="btn btn-secondary">
        Back To Diary
      </Link>

      <div className="my-5">
        <h1 className="mb-5">Add Food To Library</h1>
        <FormAddGenericItem
          formId={formId}
          onSubmit={onSubmitFoodTemplate}
          dataAttributeIds={dataAttributeIds}
        >
          <div className="form-group">
            <label htmlFor={dataAttributeIds.name}>Name</label>
            <input
              defaultValue=""
              id={dataAttributeIds.name}
              data-attr-name="name"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={dataAttributeIds.servingUnit}>Serving Unit</label>
            <select
              defaultValue=""
              id={dataAttributeIds.servingUnit}
              data-attr-name="servingUnit"
              className="form-control text-capitalize"
              required
            >
              {domServingUnitOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={dataAttributeIds.servingSize}>Serving Size</label>
            <input
              defaultValue="1"
              id={dataAttributeIds.servingSize}
              data-attr-name="servingSize"
              type="number"
              min="1"
              className="form-control"
              required
            />
          </div>

          <fieldset>
            <legend>Nutrition Per Serving</legend>
            <div className="form-group">
              <label htmlFor={dataAttributeIds.fat}>Fat (g)</label>
              <input
                defaultValue="0"
                id={dataAttributeIds.fat}
                data-attr-name="fat"
                type="number"
                min="0"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={dataAttributeIds.protein}>Protein (g)</label>
              <input
                defaultValue="0"
                id={dataAttributeIds.protein}
                data-attr-name="protein"
                type="number"
                min="0"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={dataAttributeIds.carbs}>Carbs (g)</label>
              <input
                defaultValue="0"
                id={dataAttributeIds.carbs}
                data-attr-name="carbs"
                type="number"
                min="0"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={dataAttributeIds.calories}>Calories (g)</label>
              <input
                defaultValue="0"
                id={dataAttributeIds.calories}
                data-attr-name="calories"
                type="number"
                min="0"
                className="form-control"
                required
              />
            </div>
          </fieldset>
        </FormAddGenericItem>
      </div>
    </div>
  );
}

export default PageAddFoodToLibrary;
