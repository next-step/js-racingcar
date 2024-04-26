export function getMaxPosition(cars) {
  return Math.max(...cars.map((car) => car.position));
}

export const getWinners = (cars) => {
  const maxPosition = getMaxPosition(cars);
  return cars
    .filter((car) => car.position === maxPosition)
    .map((car) => car.name);
};
