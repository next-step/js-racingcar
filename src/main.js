import { makeCar, drawSkidMark } from "./car.js";

export default async function start() {
  const cars = await makeCar();

  console.log("경주 시작!");
  console.log("");
  for (let i = 0; i < 5; i++) {
    cars.forEach((car) => {
      car.go();
      console.log(`${car.name} : ${drawSkidMark(car.state)}`);
      console.log("");
    });
  }
}
