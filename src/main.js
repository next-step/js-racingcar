import { inputCarNames, inputRaceRoundCount } from "./view/input.js";
import { consoleRaceResult } from "./view/output.js";

import Race from "./domain/Race.js";
import Car from "./domain/Car.js";
import { getRaceCondition } from "./domain/getRaceCondition.js";

async function play() {
  try {
    const names = await inputCarNames();
    const cars = names.map((name) => new Car(name));

    const count = await inputRaceRoundCount();
    const race = new Race(cars, count);

    const results = race.start(count, getRaceCondition);
    const winners = race.getWinners();

    consoleRaceResult(results, winners);
  } catch {
    process.exit();
  }
}

play();
