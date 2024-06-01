export const getWinnerCars = (cars) => {
  const maxPosition = Math.max(...cars.map((car) => car.position));
  return cars.filter((car) => car.position === maxPosition);
};
