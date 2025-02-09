import { drawSkidMark } from "./car.js";

export function findFarthestCar(cars) {
  const maxState = Math.max(...cars.map((car) => car.state));

  const winners = cars
    .filter((car) => car.state === maxState)
    .map((car) => car.name);

  return winners.join(",");
}

export function tryDriveCar(car) {
  const CRITERIA = 4;

  const randomNum = Math.random() * 10;
  if (randomNum >= CRITERIA) {
    car.go();
  }
}

export const drive = (cars) => {
  cars.forEach((car) => {
    tryDriveCar(car);
    drawSkidMark(car);
  });
  console.log("");
};

export function race(raceCount, cars) {
  console.log("경주 시작!");
  console.log("");

  for (let i = raceCount; i > 0; i--) {
    drive(cars);
  }
  console.log("우승자는! " + findFarthestCar(cars) + "입니다!");
}
