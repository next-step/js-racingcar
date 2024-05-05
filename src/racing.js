export const getWinners = (cars) => {
  const maxPosition = Math.max(...cars.map((car) => car.position));

  return cars.filter((car) => car.position === maxPosition).map((car) => car.name);
};

export const createCars = (carData, CarClass) => {
  return carData.map((data) => new CarClass(data));
};
