import React from "react";

import FormAddGenericItemToLibrary from "../components/FormAddGenericItemToLibrary";

import { Link } from "react-router-dom";

import { MEASURING_UNITS_LABELS } from "../constants/constants";

class PageAddFoodToLibrary extends React.Component {
  render() {
    const { onSubmitFoodTemplate } = this.props;

    const domServingUnitOptions = [];

    for (const fullLabel in MEASURING_UNITS_LABELS) {
      domServingUnitOptions.push(
        <option key={fullLabel} value={fullLabel}>{fullLabel}</option>
      );
    }

    const dataAttributes = {
      name: '',
      servingSize: 1,
      servingUnit: 'ounce',
      fat: 0,
      carbs: 0,
      protein: 0,
      calories: 0
    }

    const { name, servingSize, servingUnit, fat, carbs, protein, calories } = dataAttributes;

    return (
      <div className="page-add-food-to-library">
        <Link to="/" className="btn btn-secondary">
          Back To Diary
        </Link>

        <div className="my-5">
          <h1 className="mb-5">Add Food To Library</h1>
          <FormAddGenericItemToLibrary
            onSubmit={onSubmitFoodTemplate}
            dataAttributes={dataAttributes}
          >
            <div className="form-group">
              <label htmlFor="input-food-name">Name</label>
              <input
                defaultValue={name}
                id="input-food-name"
                data-attr-name="name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="select-food-serving-unit">Serving Unit</label>
              <select
                defaultValue={servingUnit}
                id="select-food-serving-unit"
                data-attr-name="servingUnit"
                className="form-control text-capitalize"
              >
                {domServingUnitOptions}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input-food-serving-size">Serving Size</label>
              <input
                defaultValue={servingSize}
                id="input-food-serving-size"
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
                <label htmlFor="input-fat">Fat (g)</label>
                <input
                  defaultValue={fat}
                  id="input-fat"
                  data-attr-name="fat"
                  type="number"
                  min="0"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-protein">Protein (g)</label>
                <input
                  defaultValue={protein}
                  id="input-protein"
                  data-attr-name="protein"
                  type="number"
                  min="0"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-carbs">Carbs (g)</label>
                <input
                  defaultValue={carbs}
                  id="input-carbs"
                  data-attr-name="carbs"
                  type="number"
                  min="0"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-calories">Calories (g)</label>
                <input
                  defaultValue={calories}
                  id="input-calories"
                  data-attr-name="calories"
                  type="number"
                  min="0"
                  className="form-control"
                  required
                />
              </div>
            </fieldset>
          </FormAddGenericItemToLibrary>
        </div>
      </div>
    );
  }
}

export default PageAddFoodToLibrary;
