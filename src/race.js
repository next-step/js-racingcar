import { drawSkidMark } from "./car.js";

export function findFarthestCar(cars) {
  const maxState = Math.max(...cars.map((car) => car.state));

  const winners = cars
    .filter((car) => car.state === maxState)
    .map((car) => car.name);

  return winners.join(",");
}

export function race(count, cars) {
  if (Number(count) === 0) {
  }
}
