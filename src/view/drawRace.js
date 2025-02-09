import { tryDriveCar } from "../domain/race";

export function drawSkidMark(car) {
  let mark = "";
  for (let i = 0; i < car.state; i++) {
    mark += "-";
  }

  console.log(`${car.name} : ${mark}`);
}

export const drive = (cars) => {
  cars.forEach((car) => {
    const randomNum = Math.random() * 10;
    tryDriveCar(car, randomNum);
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
