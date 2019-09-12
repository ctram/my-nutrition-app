import React from 'react';

function Modal (props) {
  const { buttons, title, children } = props;

  let domButtons = null;

  if (buttons) {
    domButtons = buttons.map((button, idx) => {
      const { text, cssClass, onClick } = button;

      return <button onClick={onClick} className={`btn ${cssClass}`} type="button">
        {text}
      </button>;
    });
  }

  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {domButtons}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
