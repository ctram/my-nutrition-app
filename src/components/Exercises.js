import React from "react";
import PropTypes from 'prop-types';

import ExerciseItem from "./ExerciseItem";

class Exercises extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickCloseItem = this.handleClickCloseItem.bind(this);
  }

  handleClickCloseItem(item) {
    this.props.onClickCloseItem("exercise", item);
  }

  render() {
    const { onClickAddExercise, exercises } = this.props;

    let domItems = null;

    if (exercises && exercises.length > 0) {
      domItems = exercises.map(exercise => {
        return (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onClickClose={this.handleClickCloseItem}
          />
        );
      });

      domItems = <ul className="list-group list-group-flush">{domItems}</ul>;
    }

    return (
      <div className="exercises card">
        <div className="card-body">
          <h2 className="card-title text-capitalize">Exercises</h2>
        </div>
        {domItems}
        <div className="card-footer text-muted">
          <button
            onClick={onClickAddExercise}
            className="btn btn-primary"
            type="button"
          >
            Add Exercise
          </button>
        </div>
      </div>
    );
  }
}

Exercises.propTypes = {
  exercises: PropTypes.array,
  onClickAddExercise: PropTypes.func.isRequired,
  onClickCloseItem: PropTypes.func.isRequired
};

Exercises.defaultProps = {
  exercises: []
};

export default Exercises;
