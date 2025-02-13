import { inputCarNames, inputRaceRoundCount } from './view/input.js';
import { consoleRaceResult } from './view/output.js';

import Race from './domain/Race.js';
import Car from './domain/Car.js';

async function getCarNames() {
  const names = await inputCarNames();

  names.forEach((name) => {
    if (!Car.validateName(name)) process.exit();
  });

  return names;
}

async function getRaceRoundCount() {
  const count = await inputRaceRoundCount();

  if (!Race.validateRoundCount(count)) process.exit();

  return count;
}

async function play() {
  const names = await getCarNames();
  const count = await getRaceRoundCount();

  const cars = names.map((name) => new Car(name));
  const results = new Race(cars).start(count);

  if (results.length > 0) consoleRaceResult(results);
}

play();
