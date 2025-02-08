import { makeCar, drawSkidMark } from "./car.js";
import { race } from "./race.js";
import { getRaceCount } from "./getUserInput.js";

export default async function start() {
  const cars = await makeCar();

  await getRaceCount("시도할 회수는 몇회인가요? ").then((count) =>
    race(count, cars)
  );
  console.log("");
  console.log("경주 시작!");
  console.log("");

  for (let i = 0; i < 5; i++) {
    cars.forEach((car) => {
      car.go();
      drawSkidMark(car);
      console.log("");
    });
  }
}

// await start();
