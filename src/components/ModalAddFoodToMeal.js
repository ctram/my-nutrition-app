import React from 'react';

import Modal from './Modal';

class ModalAddFoodToMeal extends React.Component {
  constructor(props) {
    super(props);

    const { foodTemplates } = props;

    this.state = {
      foodTemplates,
      selectedFoodTemplateId: '',
      numberServings: 1
    };

    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeNumberServings = this.onChangeNumberServings.bind(this);
    this.onClickAddFoodToMeal = this.onClickAddFoodToMeal.bind(this);
    this.onClickAddFoodToLibrary = this.onClickAddFoodToLibrary.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { foodTemplates } = this.props;

    if (prevProps.foodTemplates !== foodTemplates) {
      this.setState({ foodTemplates });
    }
  }

  onChangeSelect(e) {
    this.setState({ selectedFoodTemplateId: e.target.value || null });
  }

  onChangeNumberServings(e) {
    this.setState({ numberServings: e.target.value });
  }

  onClickAddFoodToMeal() {
    const { foodTemplates, selectedFoodTemplateId, numberServings } = this.state;
    const { onClickAddFoodToMeal, mealType } = this.props;

    const foodTemplate = foodTemplates.find(foodTemplate => {
      return String(foodTemplate.id) === selectedFoodTemplateId;
    })

    const { name, servingSize, servingUnit, nutrition } = foodTemplate;

    const foodItem = { name, servingSize, servingUnit, nutrition, numberServings };

    onClickAddFoodToMeal(foodItem, mealType)
      .then(() => {
        this.resetState();
      });
  }

  onClickAddFoodToLibrary() {
    this.resetState();
    this.props.onClickAddFoodToLibrary();
  }

  resetState() {
    this.setState({ selectedFoodTemplateId: '', numberServings: 1 });
  }

  render() {
    const { selectedFoodTemplateId, foodTemplates, numberServings } = this.state;
    const { onClickClose } = this.props;


    let domOptions = [
      <option key={-1} value={''} label="Select A Food" />
    ];

    if (foodTemplates && foodTemplates.length > 0) {
      const _foodTemplates = foodTemplates.map((foodTemplate, idx) => {
        const { name, servingSize, servingUnit, id } = foodTemplate;

        return <option key={idx} value={id} label={`${name} (${servingSize} ${servingUnit})`} />
      });

      domOptions = domOptions.concat(_foodTemplates);
    }

    const formId = 'form-add-food-to-meal';

    const buttons = [
      {
        label: 'Add Food To Meal',
        cssClass: 'btn-primary',
        disabled: !selectedFoodTemplateId,
        form: formId,
        onClick: this.onClickAddFoodToMeal
      },
      {
        label: 'Add New Food To Library',
        cssClass: 'btn-secondary',
        form: formId,
        onClick: this.onClickAddFoodToLibrary
      }
    ];

    return (
      <Modal
        title="Add Food To Meal"
        id="modal-add-food-to-meal"
        onClickClose={onClickClose}
        buttons={buttons}
      >
        <form id={formId}>
          <div className="form-group">
            <label htmlFor="select-food">Name</label>
            <select onChange={this.onChangeSelect} value={selectedFoodTemplateId} id="select-food" className="form-control text-capitalize">
              {domOptions}
            </select>
          </div>

          {
            selectedFoodTemplateId &&
            <div className="form-group">
              <label htmlFor="input-number-servings">Number of Servings</label>
              <input onChange={this.onChangeNumberServings} value={numberServings} min="1" id="input-number-servings" type="number" className="form-control" />
            </div>
          }
        </form>
      </Modal>
    );
  }
}

export default ModalAddFoodToMeal;
