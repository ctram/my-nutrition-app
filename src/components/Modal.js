import React from 'react';

function Modal (props) {
  const { buttons, title, children, id, onClickClose } = props;

  let domButtons = null;

  if (buttons) {
    domButtons = buttons.map((button, idx) => {
      const { label, cssClass, onClick, disabled } = button;

      return <button disabled={disabled} key={idx} onClick={onClick} className={`btn ${cssClass} col my-1 mx-2`} type="button">
        {label}
      </button>;
    });
  }

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button onClick={onClickClose} type="button" className="close">
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

export default Modal;
