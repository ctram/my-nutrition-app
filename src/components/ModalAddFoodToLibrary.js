import React from 'react';

import Modal from './Modal';

import foodTemplatesData from '../mock-data/food-templates.json';

class ModalAddFoodToLibrary extends React.Component {
  render() {
    const { onClickClose } = this.props;

    const formId = 'form-add-food-to-library';

    const buttons = [];


    return (
      <Modal
        title="Add Food To Library"
        onClickClose={onClickClose}
        buttons={buttons}
      >
        <form id={formId}>
          <div className="form-group">
            <label htmlFor="input-food-name">Name</label>
            <input type="text" className="form-control" />
          </div>
        </form>
      </Modal>
    );
  }
}

export default ModalAddFoodToLibrary;
