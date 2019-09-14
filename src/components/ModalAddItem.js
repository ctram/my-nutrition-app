import React from "react";
import PropTypes from 'prop-types';

import Modal from "./Modal";
import FormAddGenericItem from "./FormAddGenericItem";

class ModalAddItem extends React.Component {
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
      onClickClose,
      children,
      modalTitle,
      modalClassName,
      onSubmit,
      formId,
      submitButtonLabel,
      dataAttributeIds
    } = this.props;
    const { disableSaveButton } = this.state;

    const buttons = [
      {
        formId,
        label: submitButtonLabel,
        cssClass: "btn-primary",
        type: "submit",
        disabled: disableSaveButton
      }
    ];

    return (
      <Modal
        className={modalClassName}
        buttons={buttons}
        title={modalTitle}
        onClickClose={onClickClose}
      >
        <FormAddGenericItem
          formId={formId}
          dataAttributeIds={dataAttributeIds}
          onSubmit={onSubmit}
          saveButtonVisible={false}
          onChange={this.handleChange}
        >
          {children}
        </FormAddGenericItem>
      </Modal>
    );
  }
}

ModalAddItem.propTypes = {
    onClickClose: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalClassName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    formId: PropTypes.string,
    submitButtonLabel: PropTypes.string.isRequired,
    dataAttributeIds: PropTypes.object.isRequired
};

ModalAddItem.defaultProps = {
  formId: '',
  modalClassName: ''
};

export default ModalAddItem;
