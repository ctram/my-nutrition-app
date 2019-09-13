import React from "react";

import Modal from "./Modal";

class ModalAddGenericItemToCollection extends React.Component {
  constructor(props) {
    super(props);

    const { templates, dataAttributes } = props;

    const state = {
      templates,
      selectedTemplateId: ""
    };

    for (const attr in dataAttributes) {
      state[attr] = dataAttributes[attr];
    }

    this.state = state;

    this.onFormChange = this.onFormChange.bind(this);
    this.onClickAddItemToDiary = this.onClickAddItemToDiary.bind(this);
    this.onClickAddItemToLibrary = this.onClickAddItemToLibrary.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { templates } = this.props;

    if (prevProps.templates !== templates) {
      this.setState({ templates });
    }
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

  onFormChange(e) {
    const newState = { ...this.state };
    const { templates } = this.props;
    const value = e.target.value;
    const attr = e.target.getAttribute("data-attr-name");

    newState[attr] = value;

    if (attr === 'selectedTemplateId') {
      const template = templates.find(template => {
        return template.id === parseInt(value);
      })

      newState['name'] = template.name
    }

    this.setState(newState);
  }

  resetState() {
    const newState = { ...this.state };

    for (const key in newState) {
      newState[key] = null;
    }

    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();

    const attrs = { ...this.state };
    delete attrs['templates'];

    // cast values to numbers, if possible.
    for (const attr in attrs) {
      const val = attrs[attr];
      const int = parseInt(val);
      attrs[attr] = window.isNaN(int) ? val : int;
    }

    delete attrs['selectedTemplateId'];

    this.props.onSubmit(attrs);
  }

  render() {
    const { title, entityName, children, buttons, formId, dataAttributes: { selectedTemplateId } } = this.props;
    const { templates } = this.state;

    const domTemplateOptions = templates.map(
      (template, idx) => {
        const { id, name } = template;
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      }
    );

    return (
      <Modal
        title={title}
        id={formId}
        onClickClose={this.onClickClose}
        buttons={buttons}
      >
        <form id={formId} onChange={this.onFormChange} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="select-template-id">{entityName}</label>
            <select
              defaultValue={selectedTemplateId}
              data-attr-name="selectedTemplateId"
              id="select-template-id"
              className="form-control text-capitalize"
              required
            >
              {domTemplateOptions}
            </select>
          </div>
          {children}
        </form>
      </Modal>
    );
  }
}

export default ModalAddGenericItemToCollection;
