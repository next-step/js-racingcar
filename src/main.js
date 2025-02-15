import { inputCarNames, inputRaceRoundCount } from "./view/input.js";
import { consoleRaceResult } from "./view/output.js";

import Race from "./domain/Race.js";
import Car from "./domain/Car.js";

import { getRandomNumber } from "./getRandomNumber.js";

const FORWARD_MIN_VALUE = 4;
const FORWARD_MIN_RANGE = 0;
const FORWARD_MAX_RANGE = 9;

const raceCondition = () =>
  getRandomNumber(FORWARD_MIN_RANGE, FORWARD_MAX_RANGE) >= FORWARD_MIN_VALUE;

async function play() {
  try {
    const names = await inputCarNames();
    const cars = names.map((name) => new Car(name));

    const count = await inputRaceRoundCount();
    const race = new Race(cars, count, raceCondition);

    const results = race.start();
    const winners = race.getWinners();

    consoleRaceResult(results, winners);
  } catch {
    process.exit();
  }
}

play();
