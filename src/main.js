import Car from "./Car.js";
import RacingGame from "./RacingGame.js";
import {
  createReadlineInterface,
  getCarNamesFromInput,
  getTrialCountFromInput,
  printRacingGameResult,
} from "./io.js";

const getCanMove = () => {
  const MIN = 0;
  const MAX = 9;
  const randomNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

  return randomNumber >= 4;
};

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const names = await getCarNamesFromInput(readline);
    const cars = names.map((name) => new Car(name));
    const trialCount = await getTrialCountFromInput(readline);

    const racingGame = new RacingGame(cars, trialCount, getCanMove);

    printRacingGameResult(racingGame);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
