import Car, { makeCar } from "./car.js";

export default async function start() {
  const cars = await makeCar();

  console.log("경주 시작!");
  for (let i = 0; i < 5; i++) {
    cars.forEach((car) => car.go());
  }

  console.log(cars);
}

// await start();
