import { makeCar } from "./car.js";
import { race, findFarthestCar } from "./race.js";
import { getRaceCount } from "./getUserInput.js";

export default async function start() {
  const cars = await makeCar();

  const raceCount = await getRaceCount("시도할 회수는 몇회인가요? ");
  race(raceCount, cars);
}

// await start();
