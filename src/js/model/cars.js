const cars = [];

export const getCars = () => cars;

export const createCars = (carNameList) =>
  carNameList.map((carName) => ({
    name: carName,
    step: 0,
  }));

export const updateCarStep = (car, isForward) => {
  if (isForward) {
    car.step += 1;
  }
};

export const updateCars = (newCars) => {
  cars.push(...newCars);
};
