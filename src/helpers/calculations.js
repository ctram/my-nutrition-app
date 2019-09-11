export function sumItemStats (items) {
  let res = { fat: 0, carbs: 0, protein: 0, calories: 0 };

  if (items == null || items.length === 0) {
    return res;
  }

  for (const item of items) {
    const { fat, protein, calories, carbs } = item.nutrition;

    res['fat'] += fat;
    res['protein'] += protein;
    res['carbs'] += carbs;
    res['calories'] += calories;
  }

  return res;
}
