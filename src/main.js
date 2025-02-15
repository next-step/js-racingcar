import { inputCarNames, inputRaceRoundCount } from "./view/input.js";
import { consoleRaceResult } from "./view/output.js";

import Race from "./domain/Race.js";
import Car from "./domain/Car.js";

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

function formatResults(results) {
  return results.flatMap((round) =>
    round
      .map(({ name, location }) => `${name} : ${"-".repeat(location)}`)
      .concat("")
  );
}

async function play() {
  const names = await getCarNames();
  const count = await getRaceRoundCount();

  const cars = names.map((name) => new Car(name));

  const race = new Race(cars);
  const results = race.start(count);
  const winners = race.getWinners();

  consoleRaceResult(formatResults(results), winners);
}

play();
