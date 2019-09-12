import React from 'react';

import FormAddFoodToLibrary from '../components/FormAddFoodToLibrary';
import { Link } from "react-router-dom";

class PageAddFoodToLibrary extends React.Component {
  render() {
    const { onSubmitNewFood } = this.props;

    return (
      <div>

        <Link to="/" className="btn btn-secondary">
          Back To Diary
        </Link>

        <div className="my-5">
          <FormAddFoodToLibrary onSubmit={onSubmitNewFood} />
        </div>
      </div>
    );
  }
}

export default PageAddFoodToLibrary;
