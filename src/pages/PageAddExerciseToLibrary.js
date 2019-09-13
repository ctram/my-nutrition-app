import React from 'react';

import FormAddGenericItemToLibrary from '../components/FormAddGenericItemToLibrary';

import { Link } from "react-router-dom";

class PageAddFoodToLibrary extends React.Component {
  render() {
    const { onSubmitNewExercise } = this.props;

    return (
      <div className="page-add-food-to-library">
        <Link to="/" className="btn btn-secondary">
          Back To Diary
        </Link>

        <div className="my-5">
          <h1 className="mb-5">Add Exercise To Library</h1>
          <FormAddGenericItemToLibrary onSubmit={onSubmitNewExercise}>
            <div className="form-group">
              <label htmlFor="input-name">Name</label>
              <input data-attr-name="name" id="input-name" type="text" className="form-control" />
            </div>
          </FormAddGenericItemToLibrary>
        </div>
      </div>
    );
  }
}

export default PageAddFoodToLibrary;
