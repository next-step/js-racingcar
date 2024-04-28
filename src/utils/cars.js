import Car from "../domain/Car.js";

export const createCars = (input) => {
  const carNames = input.split(",");

  return carNames.map((carName) => new Car(carName));
};

export const printCarsStatus = (cars) => {
  cars.forEach((car) => {
    console.log(car.statusToString());
  });
  console.log();
};

export const joinCarNamesByComma = (cars) => {
  const carNames = cars.map((car) => car.name);
  return carNames.join(", ");
};
