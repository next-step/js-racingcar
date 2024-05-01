import Car from "../domain/Car.js";

export const createCarsFromCarNames = (carNames) => {
  return carNames.map((carName) => new Car(carName));
};

export const joinCarNamesByComma = (cars) => {
  const carNames = cars.map((car) => car.name);
  return carNames.join(", ");
};
