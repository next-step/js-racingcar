const cars = [];

export const getCars = () => cars;

export const createCars = (carNameList) => {
  const newCars = carNameList.map((carName) => ({
    name: carName,
    step: 0,
  }));
  cars.push(...newCars);
};

export const updateCarStep = (car, isForward) => {
  if (isForward) {
    car.step += 1;
  }
};
