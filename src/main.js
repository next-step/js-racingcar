import Input from "./Input.js";
import Race from "./domain/Race.js";

async function main() {
  const input = new Input();
  const cars = await input.askCarNames();
  const race = new Race(cars);
  race.start();
}

main();
