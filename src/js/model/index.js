import { Car } from "./Car.js"

export const generateCars = function (carNames) {
  const cars = carNames.map((name) => new Car(name))
  return cars;
}
