import React from 'react';

import Modal from './Modal';

class ModalAddFood extends React.Component {
  constructor(props) {
    super(props);

    this.onClickSave = this.onClickSave.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickSave() {

  }

  onClickClose() {
    const { mealType } = this.props;
    this.props.onClickClose(mealType)
  }

  render() {
    const buttons = [
      {
        label: 'Save',
        cssClass: 'btn-primary',
        onClick: this.onClickSave
      },
      {
        label: 'Cancel',
        cssClass: 'btn-secondary',
        onClick: this.onClickClose
      }
    ]

    return (
      <Modal
        buttons={buttons}
        title="Add Food"
        id="modal-add-food"
        onClickClose={this.onClickClose}
      >
      </Modal>
    );
  }
}

export default ModalAddFood;
