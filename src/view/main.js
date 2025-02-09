import { makeCar } from "../domain/car.js";
import { race } from "../domain/race.js";
import { getRaceCount } from "../domain/getUserInput.js";

export default async function start() {
  const cars = await makeCar();

  const raceCount = await getRaceCount("시도할 회수는 몇회인가요? ");
  race(raceCount, cars);
}

// await start();
