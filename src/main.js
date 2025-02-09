import Car from "./Car.js";
import {
  createReadlineInterface,
  getCarNamesFromInput,
  printRacingGameResult,
} from "./io.js";
import { racingGameGenerator } from "./racing.js";

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const names = await getCarNamesFromInput(readline);
    const cars = names.map((name) => new Car(name));
    const racingGame = racingGameGenerator(cars);

    printRacingGameResult(racingGame);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
