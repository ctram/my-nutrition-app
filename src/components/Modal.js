import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    this.props.onClickClose();
  }

  render() {
    const { buttons, title, children, id, onClickClose } = this.props;

    let domButtons = null;

    if (buttons) {
      domButtons = buttons.map((button, idx) => {
        const { label, cssClass, onClick, disabled, formId, type } = button;

        return <button form={formId} disabled={disabled} key={idx} onClick={onClick} className={`btn ${cssClass} col my-1 mx-2`} type={type}>
          {label}
        </button>;
      });
    }

    return (
      <div className="modal fade" id="my-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button onClick={this.onClickClose} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <div className="row">
                {domButtons}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Modal;
