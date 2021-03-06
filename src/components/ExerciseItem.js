import React from "react";
import PropTypes from 'prop-types';

import "../styles/ExerciseItem.css";

function ExerciseItem(props) {
  const { onClickClose } = props;
  const { name, repsPerSet, numberOfSets, duration, id } = props.exercise;

  return (
    <li className="list-group-item exercise-item text-capitalize">
      <div>
        <div className="text-right">
          <button
            onClick={() => onClickClose({ name, id })}
            type="button"
            className="close"
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="font-weight-bold exercise-item__name">{name}</div>
        <hr />
        <div className="row">
          <div className="col">
            <span className="mr-3">Reps:</span>
            <span>{repsPerSet.toLocaleString()}</span>
          </div>
          <div className="col">
            <span className="mr-3">Sets:</span>
            <span>{numberOfSets.toLocaleString()}</span>
          </div>
          <div className="col">
            <span className="mr-3">Minutes:</span>
            <span>{duration.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

ExerciseItem.propTypes = {
  onClickClose: PropTypes.func.isRequired
};

export default ExerciseItem;
