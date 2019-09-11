import React from 'react';
import '../styles/App.css';

import NavBar from './NavBar';
import MealStats from './MealStats';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-content p-3">
        <MealStats name="breakfast" />
        <MealStats name="lunch" />
        <MealStats name="dinner" />
      </div>
    </div>
  );
}

export default App;
