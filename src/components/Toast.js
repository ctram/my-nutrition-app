import React from "react";
import PropTypes from 'prop-types';

import "../styles/Toast.css";

function Toast(props) {
  let { message, colorType } = props;

  colorType = colorType || "success";

  return (
    <div className={`toast toast-${colorType} text-center text-capitalize`}>
      <div className="card py-3">{message}</div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  colorType: PropTypes.string
};

Toast.defaultProps = {
  colorType: 'success'
};

export default Toast;
