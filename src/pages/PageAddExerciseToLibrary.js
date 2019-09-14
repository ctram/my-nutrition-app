import React from 'react';

import FormAddGenericItem from '../components/FormAddGenericItem';

import { Link } from "react-router-dom";

class PageAddExerciseToLibrary extends React.Component {
  render() {
    const { onSubmitExerciseTemplate } = this.props;

    const dataAttributeIds = {
      name: 'input-exercise-name'
    };

    return (
      <div className="page-add-food-to-library">
        <Link to="/" className="btn btn-secondary">
          Back To Diary
        </Link>

        <div className="my-5">
          <h1 className="mb-5">Add Exercise To Library</h1>
          <FormAddGenericItem
            onSubmit={onSubmitExerciseTemplate}
            dataAttributeIds={dataAttributeIds}
          >
            <div className="form-group">
              <label htmlFor="input-name">Name</label>
              <input data-attr-name="name" id={dataAttributeIds.name} type="text" className="form-control" />
            </div>
          </FormAddGenericItem>
        </div>
      </div>
    );
  }
}

export default PageAddExerciseToLibrary;
