import Input from "./Input.js";
import Race from "./domain/Race.js";
import Output from "./Output.js";

async function main() {
  const input = new Input();
  const output = new Output();
  
  const cars = await input.askCarNames();
  const race = new Race(cars);
  
  race.start();
  output.printRaceResult(race.result);
}

main();
