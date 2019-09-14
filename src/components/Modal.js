import React from "react";
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    const { buttons, title, children, onClickClose } = this.props;

    let domButtons = null;

    if (buttons) {
      domButtons = buttons.map((button, idx) => {
        const { label, cssClass, onClick, disabled, formId, type } = button;

        return (
          <button
            form={formId}
            disabled={disabled}
            key={idx}
            onClick={onClick}
            className={`btn ${cssClass} col my-1 mx-2`}
            type={type}
          >
            {label}
          </button>
        );
      });
    }

    return (
      <div className="modal fade" id="my-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button onClick={onClickClose} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <div className="row">{domButtons}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  buttons: PropTypes.array,
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
  onClickClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  buttons: [],
};

export default Modal;
