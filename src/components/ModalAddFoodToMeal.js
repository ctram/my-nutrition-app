import React from "react";

import Modal from "./Modal";
import FormAddGenericItem from "./FormAddGenericItem";

class ModalAddFoodToMeal extends React.Component {
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
    const { onClickClose, foodTemplates, onSubmitFoodToMeal } = this.props;
    const { disableSaveButton } = this.state;

    const formId = "form-add-food-to-meal";

    const buttons = [
      {
        formId,
        label: "Add Food To Meal",
        cssClass: "btn-primary",
        type: "submit",
        disabled: disableSaveButton
      }
    ];

    let domOptions = [<option key={-1} value={""} label="Select A Food" />];

    if (foodTemplates && foodTemplates.length > 0) {
      const _foodTemplates = foodTemplates.map((foodTemplate, idx) => {
        const { name, servingSize, servingUnit, id } = foodTemplate;

        return (
          <option
            key={idx}
            value={id}
            label={`${name} (${servingSize} ${servingUnit})`}
          />
        );
      });

      domOptions = domOptions.concat(_foodTemplates);
    }

    const dataAttributeIds = {
      id: "select-food-id",
      numberServings: "input-number-servings"
    };

    return (
      <Modal
        className="modal-add-food-to-meal"
        buttons={buttons}
        title="Add Food To Meal"
        onClickClose={onClickClose}
      >
        <FormAddGenericItem
          formId={formId}
          dataAttributeIds={dataAttributeIds}
          onSubmit={onSubmitFoodToMeal}
          saveButtonVisible={false}
          onChange={this.handleChange}
        >
          <div className="form-group">
            <label htmlFor="select-food">Food Name</label>
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
            <label htmlFor="input-number-servings">Number of Servings</label>
            <input
              data-attr-name="numberServings"
              defaultValue="1"
              min="1"
              id={dataAttributeIds.numberServings}
              type="number"
              className="form-control"
            />
          </div>
        </FormAddGenericItem>
      </Modal>
    );
  }
}

export default ModalAddFoodToMeal;
