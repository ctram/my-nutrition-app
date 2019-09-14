import React from "react";

import Modal from "./Modal";
import FormAddGenericItem from "./FormAddGenericItem";

class ModalAddExerciseToDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableSaveButton: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let { disableSaveButton } = this.state;

    if (target.getAttribute("data-attr-name") === "id") {
      disableSaveButton = target.value === "";
      this.setState({ disableSaveButton });
    }
  }

  render() {
    const {
      exerciseTemplates,
      onClickClose,
      onSubmitExerciseToDay
    } = this.props;
    const { disableSaveButton } = this.state;

    const formId = "form-add-exercise-to-day";

    const buttons = [
      {
        formId,
        label: "Add Exercise To Day",
        cssClass: "btn-primary",
        type: "submit",
        disabled: disableSaveButton
      }
    ];

    let domOptions = [
      <option key={-1} value={""} label="Select An Exercise" />
    ];

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
      <Modal
        className="modal-add-exercise-to-day"
        buttons={buttons}
        title="Add Exercise To Day"
        onClickClose={onClickClose}
      >
        <FormAddGenericItem
          formId={formId}
          dataAttributeIds={dataAttributeIds}
          onSubmit={onSubmitExerciseToDay}
          saveButtonVisible={false}
          onChange={this.handleChange}
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
            <label htmlFor={dataAttributeIds.duration}>
              Duration (minutes)
            </label>
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
            <label htmlFor={dataAttributeIds.numberOfSets}>
              Number Of Sets
            </label>
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
        </FormAddGenericItem>
      </Modal>
    );
  }
}

export default ModalAddExerciseToDay;
