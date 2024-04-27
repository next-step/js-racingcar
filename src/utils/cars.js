import Car from "../domain/Car.js";

export const createCars = (input) => {
  const carNames = input.split(",");

  return carNames.map((carName) => new Car(carName));
};

export const validateCarNames = (input) => {
  const carNames = input.split(",");

  carNames.forEach((carName) => {
    if (!Car.isValidName(carName)) {
      throw new Error("이름은 5자 이하여야 합니다.");
    }
  });
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
