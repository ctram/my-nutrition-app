import React from "react";

import ModalAddGenericItemToCollection from './ModalAddGenericItemToCollection';

class ModalAddExerciseToDay extends React.Component {
  constructor(props) {
    super(props);

    const { exerciseTemplates } = props;

    this.state = {
      exerciseTemplates,
      selectedExerciseTemplateId: ''
    };
  }

  render() {
    const { onClickAddExerciseToDay, onClickAddExerciseToLibrary, onClickClose } = this.props;
    const { exerciseTemplates, selectedExerciseTemplateId } = this.state;

    const domExerciseTemplateOptions = exerciseTemplates.map((exerciseTemplate, idx) => {
      const { id, name } = exerciseTemplate;
      return <option value={id}>{name}</option>;
    });

    const buttons = [
      {
        cssClass: 'btn-primary col',
        label: 'Add Exercise To Day',
        onClick: () => {},
        disabled: !selectedExerciseTemplateId
      }
    ];

    return (
      <div className="modal-add-exercise-to-day">
        <ModalAddGenericItemToCollection
          title="Add Exercise"
          entityName="exercise"
          onChange={() => {}}
          onClickAddItemToDiary={onClickAddExerciseToDay}
          onClickAddFoodToLibrary={onClickAddExerciseToLibrary}
          onClickClose={onClickClose}
          buttons={buttons}
        >
          <div className="form-group">
            <label htmlFor="select-exercise-activity">Exercise Activity</label>
            <select id="select-exercise-activity" className="form-control text-capitalize">
              {domExerciseTemplateOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input-duration">Duration (minutes)</label>
            <input id="input-duration" type="number" min="0" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-number-per-set">Number Per Set</label>
            <input id="input-number-per-set" type="number" min="0" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="input-number-of-sets">Number Of Sets</label>
            <input id="input-number-of-sets" type="number" min="0" className="form-control" />
          </div>
        </ModalAddGenericItemToCollection>
      </div>
    );
  }
}

export default ModalAddExerciseToDay;
