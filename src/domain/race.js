import { drawSkidMark } from "./car.js";

export function findFarthestCar(cars) {
  const maxState = Math.max(...cars.map((car) => car.state));

  const winners = cars
    .filter((car) => car.state === maxState)
    .map((car) => car.name);

  return winners.join(",");
}

export function tryDriveCar(car, randomNum) {
  const CRITERIA = 4;

  if (randomNum >= CRITERIA) {
    car.go();
  }
}
