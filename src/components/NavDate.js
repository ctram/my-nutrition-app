import React from 'react';
import moment from 'moment';

import '../styles/NavDate.css';

import { DATE_FORMAT } from '../constants/base';

function NavDate (props) {
  const { date, onChangeDate } = props;

  let labelDate;

  if (date === moment().format(DATE_FORMAT)) {
    labelDate = 'Today'
  } else {
    const arr = date.split('-');
    labelDate = `${arr[1]}/${arr[2]}/${arr[0]}`;
  }

  return (
    <div className="nav-date">
      <div className="card">
        <div className="d-flex align-items-center justify-content-center">
          <span onClick={() => (onChangeDate('prev'))} className="chevron">
            &lt;
          </span>
          <span className="d-inline mx-3 date w-50">
            {labelDate}
          </span>
          <span onClick={() => (onChangeDate('next'))} className="chevron">
            &gt;
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavDate;
