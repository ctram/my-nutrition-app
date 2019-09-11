import React from 'react';

import MealItem from './MealItem';

function MealStats(props) {
  const { name, items } = props;

  let domInner = null;

  if (items) {
    const domItems = items.map((item) => {
      return <MealItem key={item.id} item={item} />;
    });

    domInner = (
      <ul class="list-group list-group-flush">
        {domItems}
      </ul>
    );
  }

  return (
    <div className="meal-stats card">
      <h2 className="text-capitalize card-header">{name}</h2>
      {domInner}
    </div>
  );
}

export default MealStats;
