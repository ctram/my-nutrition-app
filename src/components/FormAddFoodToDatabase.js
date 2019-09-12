import React from 'react';

class FormAddFoodToDatbase extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="input-food-name">Name</label>
          <input id="input-food-name" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="select-food-serving-unit">Serving Unit</label>
          <select id="select-food-serving-unit" className="form-control">
            <option value="ounce">Ounce</option>
            <option value="pound">Pound</option>
            <option value="gram">Gram</option>
            <option value="milligram">Milligram</option>
            <option value="piece">Piece</option>
          </select>
        </div>

        <div className="form-group">
          <label>Serving Size</label>
          <input type="number" value="1"/>
        </div>
      </form>
    );
  }
}

export default FormAddFoodToDatbase;
