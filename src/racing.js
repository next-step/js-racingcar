export const getWinners = (cars) => {
  const result = [];
  let maxPosition = 0;

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].position > maxPosition) {
      maxPosition = cars[i].position;
    }
  }
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].position === maxPosition) {
      result.push(cars[i].name);
    }
  }

  return result;
};
