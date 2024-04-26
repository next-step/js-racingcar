import Car from "../domain/Car";

export const splitNamesByComma = (names) => {
  return names.split(",");
};

export const joinNamesByComma = (nameArray) => {
  return nameArray.join(", ");
};

export const printCarsStatus = (cars) => {
  cars.forEach((car) => {
    console.log(car.statusToString());
  });
};

export const validateInput = (input) => {
  const carNames = splitNamesByComma(input);

  carNames.forEach((carName) => {
    if (!Car.isValidName(carName)) {
      throw new Error("이름은 5자 이하여야 합니다.");
    }
  });
};
