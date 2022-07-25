import { Car } from "./Car.js"

export const generateCars = (carNames) => {
  const cars = carNames.map((name) => new Car(name))
  return cars;
}
