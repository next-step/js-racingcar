import { drawSkidMark } from "./car.js";

export function findFarthestCar(cars) {
  const maxState = Math.max(...cars.map((car) => car.state));

  const winners = cars
    .filter((car) => car.state === maxState)
    .map((car) => car.name);

  return winners.join(",");
}

export function checkHeCanGo(car) {
  const randomNum = Math.random() * 10;
  if (randomNum >= 4) {
    car.go();
  }
}

export function race(count, cars) {
  cars.forEach((car) => {
    checkHeCanGo(car);
    drawSkidMark(car);
  });
  console.log("");
}
