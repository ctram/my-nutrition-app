import React from 'react';

import Modal from './Modal';

import foodTemplatesData from '../mock-data/food-templates.json';

class ModalAddFoodToLibrary extends React.Component {
  render() {
    const { onClickClose } = this.props;

    const formId = 'form-add-food-to-library';

    const buttons = [];


    return (
      <Modal
        title="Add Food To Library"
        onClickClose={onClickClose}
        buttons={buttons}
      >
        <form id={formId}>
          <div className="form-group">
            <label htmlFor="input-food-name">Name</label>
            <input id="input-food-name" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="select-food-serving-unit">Serving Unit</label>
            <select id="select-food-serving-unit">
              <option value="pound">Pound</option>
              <option value="ounce">Ounce</option>
              <option value="gram">Gram</option>
              <option value="liter">Liter</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input-food-serving-size">Serving Size</label>
            <input id="input-food-serving-size" type="number" min="1" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-fat">Fat (g)</label>
            <input id="input-fat" type="number" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-protein">Proten (g)</label>
            <input id="input-protein" type="number" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-carbs">Carbs (g)</label>
            <input id="input-carbs" type="number" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-calories">Calories (g)</label>
            <input id="input-calories" type="number" className="form-control" />
          </div>
        </form>
      </Modal>
    );
  }
}

export default ModalAddFoodToLibrary;
