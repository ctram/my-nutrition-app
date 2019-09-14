import React from "react";

class FormAddGenericItem extends React.Component {
  constructor(props) {
    super(props);

    this.refForm = React.createRef();

    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetState() {
    this.refForm.current && this.refForm.current.reset();
  }

  onSubmit(e) {
    e.preventDefault();

    const { dataAttributeIds } = this.props;
    const data = {};

    for (const attr in dataAttributeIds) {
      const id = dataAttributeIds[attr];
      const value = document.getElementById(id).value;
      const num = Number(value);
      data[attr] = window.isNaN(num) ? value : num;
    }

    this.props.onSubmit(data).then(() => {
      this.resetState();
    });
  }

  render() {
    const { children, saveButtonVisible, formId, onChange } = this.props;

    return (
      <form
        onChange={onChange}
        onSubmit={this.onSubmit}
        id={formId}
        ref={this.refForm}
      >
        {children}
        {saveButtonVisible && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
      </form>
    );
  }
}

FormAddGenericItem.defaultProps = {
  saveButtonVisible: true,
  onChange: () => {}
};

export default FormAddGenericItem;
