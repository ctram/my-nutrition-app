import React from 'react';

function MealStats(props) {
  const { name } = props;

  return (
    <div className="meal-stats">
      <h2 className="text-capitalize">{name}</h2>
    </div>
  );
}

export default MealStats;
