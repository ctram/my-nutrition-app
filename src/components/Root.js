import React from "react";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

class Root extends React.Component {
  render() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
}

export default Root;
