import { makeCar, drawSkidMark } from "./car.js";
import { race, findFarthestCar } from "./race.js";
import { getRaceCount } from "./getUserInput.js";

export default async function start() {
  let count = 0;
  const cars = await makeCar();

  await getRaceCount("시도할 회수는 몇회인가요? ").then(
    (inputValue) => (count = inputValue)
  );

  while (count !== 0) {
    race(count, cars);
    count--;
  }

  if (Number(count) === 0) {
    console.log("우승자는! " + findFarthestCar(cars) + "입니다!");
  }
}

// await start();
