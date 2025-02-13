import Car from "./Car.js";
import RacingGame from "./RacingGame.js";
import {
  createReadlineInterface,
  getCarNamesFromInput,
  getTrialCountFromInput,
  printRacingGameResult,
} from "./io.js";

const canMove = () => {
  const MIN = 0;
  const MAX = 9;
  const THRESHOLD = 4;
  const randomNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

  return randomNumber >= THRESHOLD;
};

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const names = await getCarNamesFromInput(readline);
    const cars = names.map((name) => new Car(name));
    const trialCount = await getTrialCountFromInput(readline);

    const racingGame = new RacingGame(cars, trialCount, canMove);
    const raceResults = [...racingGame.runRace()];
    const winners = racingGame.getWinners();

    printRacingGameResult(raceResults, winners);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
