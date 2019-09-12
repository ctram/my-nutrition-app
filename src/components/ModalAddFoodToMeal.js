import React from 'react';

import Modal from './Modal';

import foodTemplatesData from '../mock-data/food-templates.json';

class ModalAddFoodToMeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFoodTemplateId: '',
      foodTemplates: []
    };

    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidMount() {
    // in actual app, we'd probably call the server for a collection
    // of food templates; here we just pull in mock data.
    this.setState({ foodTemplates: foodTemplatesData.foods });
  }

  onChangeSelect(e) {
    this.setState({ selectedFoodTemplateId: e.target.value || null });
  }

  render() {

    const { selectedFoodTemplateId, foodTemplates } = this.state;
    const { onClickClose } = this.props;

    let domOptions = [
      <option key={-1} value={''} label="Select A Food" />
    ];

    if (foodTemplates && foodTemplates.length > 0) {
      const _foodTemplates = foodTemplates.map((foodTemplate, idx) => {
        const { name, servingSize, servingSizeUnit, id } = foodTemplate;

        return <option key={idx} value={id} label={`${name} (${servingSize} ${servingSizeUnit})`} />
      });

      domOptions = domOptions.concat(_foodTemplates);
    }

    const buttons = [
      {
        label: 'Add Food To Meal',
        cssClass: 'btn-primary',
        disabled: !selectedFoodTemplateId
      },
      {
        label: 'Add New Food To Library',
        cssClass: 'btn-secondary'
      }
    ];

    return (
      <Modal
        title="Add Food To Meal"
        id="modal-add-food-to-meal"
        onClickClose={onClickClose}
        buttons={buttons}
      >
        <form>
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
              <input id="input-number-servings" type="number" className="form-control" />
            </div>
          }
        </form>
      </Modal>
    );
  }
}

export default ModalAddFoodToMeal;
