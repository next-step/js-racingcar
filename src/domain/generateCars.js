import { CAR } from "../constants/error.js";
import Car from "./Car.js";

export const generateCars = (inputCarNames) => {
  const splitName = inputCarNames.split(",");
  if (splitName.length === 0) throw new Error(CAR.NAME_EMPTY);

  return splitName.map((name) => new Car(name, 0));
};
