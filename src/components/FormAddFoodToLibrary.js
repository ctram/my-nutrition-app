import React from "react";

import foodTemplatesData from "../mock-data/food-templates.json";

class FormAddFoodToLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      servingSize: 1,
      servingUnit: 'ounce',
      fat: 0,
      carbs: 0,
      protein: 0,
      calories: 0
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {

    const attrName = e.target.getAttribute('data-attribute-name');

    const nextState = {}
    nextState[attrName] = e.target.value;
    this.setState(nextState);
  }

  submitForm(e) {
    e.preventDefault();

    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const {
      name,
      servingUnit,
      servingSize,
      fat,
      protein,
      carbs,
      calories
    } = this.state;

    const formId = "form-add-food-to-library";

    return (
      <form id={formId} onSubmit={this.submitForm} >
        <div className="form-group">
          <label htmlFor="input-food-name">Name</label>
          <input
            value={name}
            onChange={this.onChange}
            id="input-food-name"
            data-attribute-name="name"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="select-food-serving-unit">Serving Unit</label>
          <select
            onChange={this.onChange}
            value={servingUnit}
            id="select-food-serving-unit"
            data-attribute-name="servingUnit"
            className="form-control"
          >
            <option value="pound">Pound</option>
            <option value="ounce">Ounce</option>
            <option value="gram">Gram</option>
            <option value="liter">Liter</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="input-food-serving-size">Serving Size</label>
          <input
            onChange={this.onChange}
            value={servingSize}
            id="input-food-serving-size"
            data-attribute-name="servingSize"
            type="number"
            min="1"
            className="form-control"
            required
          />
        </div>

        <fieldset>
          <legend>Nutrition</legend>
          <div className="form-group">
            <label htmlFor="input-fat">Fat (g)</label>
            <input
              onChange={this.onChange}
              value={fat}
              id="input-fat"
              data-attribute-name="fat"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-protein">Protein (g)</label>
            <input
              onChange={this.onChange}
              value={protein}
              id="input-protein"
              data-attribute-name="protein"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-carbs">Carbs (g)</label>
            <input
              onChange={this.onChange}
              value={carbs}
              id="input-carbs"
              data-attribute-name="carbs"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-calories">Calories (g)</label>
            <input
              onChange={this.onChange}
              value={calories}
              id="input-calories"
              data-attribute-name="calories"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}

export default FormAddFoodToLibrary;
