import React from 'react';

class Exercises extends React.Component {
  render() {
    return (
      <div className="exercises card">
        <div className="card-body">
          <h2 className="card-title text-capitalize">Exercises</h2>
        </div>
        <div className="card-footer text-muted">
          <button onClick={this.onClickAddExercise} className="btn btn-primary" type="button">
            Add Exercise
          </button>
        </div>
      </div>
    );
  }
}

export default Exercises;
