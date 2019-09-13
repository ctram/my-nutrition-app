import React from 'react';

import ExerciseItem from './ExerciseItem';

class Exercises extends React.Component {
  render() {
    const { onClickAddExercise, exercises } = this.props;
    
    let domItems = null;

    if (exercises && exercises.length > 0) {
      domItems = exercises.map(exercise => {
        return <ExerciseItem key={exercise.name} exercise={exercise} />;
      });

      domItems = (
        <ul className="list-group list-group-flush">
          {domItems}
        </ul>
      );
    }

    return (
      <div className="exercises card">
        <div className="card-body">
          <h2 className="card-title text-capitalize">Exercises</h2>
        </div>
        {domItems}
        <div className="card-footer text-muted">
          <button onClick={onClickAddExercise} className="btn btn-primary" type="button">
            Add Exercise
          </button>
        </div>
      </div>
    );
  }
}

export default Exercises;
