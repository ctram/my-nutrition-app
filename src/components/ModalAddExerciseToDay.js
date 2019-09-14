import React from "react";
import PropTypes from 'prop-types';

import ModalAddItem from "./ModalAddItem";

function ModalAddExerciseToDay(props) {
  const { exerciseTemplates, onClickClose, onSubmitExerciseToDay } = props;

  let domOptions = [<option key={-1} value={""} label="Select An Exercise" />];

  if (exerciseTemplates && exerciseTemplates.length > 0) {
    const _exerciseTemplates = exerciseTemplates.map(exerciseTemplate => {
      const { name, id } = exerciseTemplate;

      return <option key={id} value={id} label={name} />;
    });

    domOptions = domOptions.concat(_exerciseTemplates);
  }

  const dataAttributeIds = {
    id: "select-exercise-id",
    repsPerSet: "input-reps-per-set",
    numberOfSets: "input-number-of-sets",
    duration: "input-duration"
  };

  return (
    <ModalAddItem
      onClickClose={onClickClose}
      modalTitle="Add Exercise To Day"
      modalClassName="modal-add-exercise-to-day"
      onSubmit={onSubmitExerciseToDay}
      formId="form-add-exercise-to-day"
      submitButtonLabel="Add Exercise To Day"
      dataAttributeIds={dataAttributeIds}
    >
      <div className="form-group">
        <label htmlFor={dataAttributeIds.id}>Exercise Name</label>
        <select
          data-attr-name="id"
          defaultValue=""
          id={dataAttributeIds.id}
          className="form-control text-capitalize"
          required
        >
          {domOptions}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={dataAttributeIds.duration}>Duration (minutes)</label>
        <input
          defaultValue="0"
          data-attr-name="duration"
          id={dataAttributeIds.duration}
          type="number"
          min="0"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={dataAttributeIds.repsPerSet}>Reps Per Set</label>
        <input
          defaultValue="0"
          data-attr-name="repsPerSet"
          id={dataAttributeIds.repsPerSet}
          type="number"
          min="0"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={dataAttributeIds.numberOfSets}>Number Of Sets</label>
        <input
          defaultValue="0"
          data-attr-name="numberOfSets"
          id={dataAttributeIds.numberOfSets}
          type="number"
          min="0"
          className="form-control"
          required
        />
      </div>
    </ModalAddItem>
  );
}

ModalAddExerciseToDay.propTypes = {
  exerciseTemplates: PropTypes.array,
  onClickClose: PropTypes.func.isRequired,
  onSubmitExerciseToDay: PropTypes.func.isRequired
};

ModalAddExerciseToDay.defaultProps = {
  exerciseTemplates: []
};

export default ModalAddExerciseToDay;
