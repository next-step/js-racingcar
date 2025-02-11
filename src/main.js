import Input from "../view/Input.js";
import Race from "./domain/Race.js";
import Output from "../view/Output.js";
import Car from "./domain/Car.js";

async function main() {
  const input = new Input();
  const output = new Output();

  const carNames = await input.askCarNames();
  const cars = carNames.map((name) => new Car(name));

  const race = new Race(cars);

  race.start();
  output.printRaceResult(race.result);
}

main();
