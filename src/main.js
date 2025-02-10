import { getCarName, getRaceRoundCount } from './input.js';
import { consoleRaceResult } from './output.js';

import Race from './domain/Race.js';
import Car from './domain/Car.js';

async function play() {
  const names = await getCarName();
  const count = await getRaceRoundCount();

  const cars = names.map((name) => new Car(name));
  const results = new Race(cars).start(count);

  if (results.length > 0) consoleRaceResult(results);
}

play();
