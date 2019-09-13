export function sumItemStats (items) {
  let res = { fat: 0, carbs: 0, protein: 0, calories: 0 };

  if (items == null || items.length === 0) {
    return res;
  }

  for (const item of items) {
    const { numberServings, nutrition: { fat, protein, calories, carbs } } = item;

    res['fat'] += fat * numberServings;
    res['protein'] += protein * numberServings;
    res['carbs'] += carbs * numberServings;
    res['calories'] += calories * numberServings;
  }

  return res;
}
