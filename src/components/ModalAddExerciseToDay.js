import React from "react";

import ModalAddGenericItemToCollection from "./ModalAddGenericItemToCollection";

class ModalAddExerciseToDay extends React.Component {
  constructor(props) {
    super(props);

    const { exerciseTemplates } = props;

    this.state = {
      exerciseTemplates
    };
  }

  render() {
    const {
      onAddExerciseToDay,
      onClickAddExerciseToLibrary,
      onClickClose,
      onSubmitExercise
    } = this.props;
    const { exerciseTemplates } = this.state;

    const defaultSelectValue = exerciseTemplates[0].id || "";
    const defaultName = exerciseTemplates[0].name || "";
    const formId = "form-add-exercise";

    const buttons = [
      {
        formId,
        cssClass: "btn-primary col",
        label: "Add Exercise To Day",
        type: "submit",
        disabled: false
      }
    ];

    const dataAttributes = {
      selectedTemplateId: defaultSelectValue,
      name: defaultName,
      repsPerSet: 0,
      numberOfSets: 0,
      duration: 0
    };

    return (
      <div className="modal-add-exercise-to-day">
        <ModalAddGenericItemToCollection
          title="Add Exercise"
          entityName="exercise"
          formId="form-add-exercise"
          onClickClose={onClickClose}
          buttons={buttons}
          dataAttributes={dataAttributes}
          templates={exerciseTemplates}
          onSubmit={onAddExerciseToDay}
        >
          <div className="form-group">
            <label htmlFor="input-duration">Duration (minutes)</label>
            <input
              defaultValue={dataAttributes.duration}
              data-attr-name="duration"
              id="input-duration"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-number-per-set">Reps Per Set</label>
            <input
              defaultValue={dataAttributes.repsPerSet}
              data-attr-name="repsPerSet"
              id="input-reps-per-set"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-number-of-sets">Number Of Sets</label>
            <input
              defaultValue={dataAttributes.numberOfSets}
              data-attr-name="numberOfSets"
              id="input-number-of-sets"
              type="number"
              min="0"
              className="form-control"
              required
            />
          </div>
        </ModalAddGenericItemToCollection>
      </div>
    );
  }
}

export default ModalAddExerciseToDay;
