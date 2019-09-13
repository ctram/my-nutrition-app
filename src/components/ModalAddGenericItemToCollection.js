import React from "react";

import Modal from "./Modal";

class ModalAddGenericItemToCollection extends React.Component {
  constructor(props) {
    super(props);

    const { templates } = props;

    this.state = {
      templates,
      selectedTemplateId: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onClickAddItemToDiary = this.onClickAddItemToDiary.bind(this);
    this.onClickAddItemToLibrary = this.onClickAddItemToLibrary.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { templates } = this.props;

    if (prevProps.templates !== templates) {
      this.setState({ templates });
    }
  }

  onChange(e) {
    const attrName = e.target.getAttribute('data-attribute-name');
    const newState = {};
    newState[attrName] = e.target.value;

    this.setState(newState);
  }

  onClickAddItemToDiary(data) {
    this.props.onClickAddItemToDiary(data).then(() => {
      this.resetState();
    });
  }

  onClickAddItemToLibrary() {
    this.props.onClickAddItemToLibrary();
  }

  onClickClose() {
    this.resetState();
    this.props.onClickClose();
  }

  resetState() {
    const newState = { ...this.state };

    for (const key in newState) {
      newState[key] = null;
    }

    this.setState(newState);
  }

  render() {
    const { title, entityName, children, buttons } = this.props;
    const formId = `form-add-${entityName}`;

    return (
      <Modal
        title={title}
        id={`modal-add-${entityName}`}
        onClickClose={this.onClickClose}
        buttons={buttons}
      >
        <form id={formId}>
          {children}
        </form>
      </Modal>
    );
  }
}

export default ModalAddGenericItemToCollection;
