import Input from "./view/Input.js";
import Race from "./domain/Race.js";
import Output from "./view/Output.js";
import Car from "./domain/Car.js";

async function main() {
  const input = new Input();
  const output = new Output();

  try {
    const carNames = await input.getCarNames();
    const cars = carNames.map((name) => new Car(name));
    const rounds = await input.getRoundCount();

    const race = new Race(cars, rounds);

    const raceResult = race.start();
    const raceWinners = race.getWinners();

    output.printRaceResult(raceResult);
    output.printWinners(raceWinners);
  } catch (error) {
    output.printErrorMessage(error);
  }
}

main();
