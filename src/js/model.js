import {CAR} from "./constants/constants.js";

export const validateCarNames = (namesArr) => {
  const namesError = namesArr
    .split(",")
    .filter((name) => name.trim().length >= CAR.NAME_MAX_LENGTH).length;

  if (!namesArr) return false;
  if (namesError > 0) return false;

  return true;
};

export const validateAttempts = (attempts) => (attempts <= 0 ? false : true);

export class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  forward() {
    this.position += 1;
  }
}

export const getCarNamesArr = (element) =>
  element.value.split(",").map((carName) => new Car(carName.trim()));
