import React from "react";

import '../styles/Toast.css';

function Toast(props) {
  let { message, colorType } = props;

  colorType = colorType || 'success';

  return (
    <div className={`toast toast-${colorType} text-center text-capitalize`}>
      <div className="card py-3">
        {message}
      </div>
    </div>
  );
}

export default Toast;
