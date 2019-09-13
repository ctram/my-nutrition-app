import React from "react";

class FormAddGenericItemToLibrary extends React.Component {
  constructor(props) {
    super(props);

    const { dataAttributes } = props;
    const state = {};

    for (const attr in dataAttributes) {
      state[attr] = dataAttributes[attr];
    }

    this.state = state;

    this.onFormChange = this.onFormChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFormChange(e) {
    const newState = { ...this.state };
    const { templates } = this.props;
    const value = e.target.value;
    const attr = e.target.getAttribute("data-attr-name");

    newState[attr] = value;

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

    // cast values to numbers, if possible.
    for (const attr in attrs) {
      const val = attrs[attr];
      const int = parseInt(val);
      attrs[attr] = window.isNaN(int) ? val : int;
    }

    this.props.onSubmit(attrs);
  }

  render() {
    const { children } = this.props;

    return (
      <form onChange={this.onFormChange} onSubmit={this.onSubmit}>
        {children}
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    );
  }
}

export default FormAddGenericItemToLibrary;
