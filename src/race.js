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
  if (Number(count) === 0) {
    console.log(findFarthestCar(cars));
  }

  //   for(let i = 0; i < Number(count); i++){
  //     cars.forEach(car => {

  //     })
  //   }
}
