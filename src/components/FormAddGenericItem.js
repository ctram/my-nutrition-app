import React from "react";
import PropTypes from 'prop-types';

class FormAddGenericItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dataAttributeIds } = this.props;
    const data = {};

    for (const attr in dataAttributeIds) {
      const id = dataAttributeIds[attr];
      const value = document.getElementById(id).value;
      const num = Number(value);
      data[attr] = window.isNaN(num) ? value : num;
    }

    this.props.onSubmit(data)
  }

  render() {
    const { children, saveButtonVisible, formId, onChange } = this.props;

    return (
      <form
        onChange={onChange}
        onSubmit={this.handleSubmit}
        id={formId}
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

FormAddGenericItem.propTypes = {
  formId: PropTypes.string,
  dataAttributeIds: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saveButtonVisible: PropTypes.bool,
  onChange: PropTypes.func
};

FormAddGenericItem.defaultProps = {
  formId: '',
  saveButtonVisible: true,
  onChange: () => {}
};

export default FormAddGenericItem;
