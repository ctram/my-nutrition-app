import React from "react";

import "../styles/MealStats.css";

import MealItem from "./MealItem";

import { sumItemStats } from "../helpers/calculations";

class MealStats extends React.Component {
  constructor(props) {
    super(props);

    this.onClickAddFood = this.onClickAddFood.bind(this);
    this.onClickCloseItem = this.onClickCloseItem.bind(this);
  }

  onClickAddFood(e) {
    const { onClickAddFood, name } = this.props;
    onClickAddFood(name);
  }

  onClickCloseItem(item) {
    const { name: mealName, onClickCloseItem } = this.props;
    onClickCloseItem(mealName, item);
  }

  render() {
    const { name, items, onClickCloseItem } = this.props;

    let domItems = null;
    let domTotalMealStats = null;

    if (items && items.length > 0) {
      domItems = items.map((item, idx) => {
        return <MealItem key={item.id || idx} item={item} onClickClose={this.onClickCloseItem} />;
      });

      domItems = <ul className="list-group list-group-flush">{domItems}</ul>;

      // we can also do this summation in the map() above, but let's keep
      // code sepearate for ease of reading.
      const { fat, protein, carbs, calories } = sumItemStats(items);

      domTotalMealStats = (
        <div className="meal-stats-summary">
          <div className="d-flex justify-content-center">
            <div>
              <span className="text-danger font-weight-bold">Fat: </span>
              <span>{fat.toLocaleString()}</span>
            </div>
            <div className="mx-3">
              <span className="text-success font-weight-bold">Protein: </span>
              <span>{protein.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-info font-weight-bold">Carbs: </span>
              <span>{carbs.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-weight-bold">Calories: </span>
            <span>{calories.toLocaleString()}</span>
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
        <div className="card-footer text-muted">
          <button
            onClick={this.onClickAddFood}
            className="btn btn-primary"
            type="button"
          >
            Add Food
          </button>
        </div>
      </div>
    );
  }
}

export default MealStats;
