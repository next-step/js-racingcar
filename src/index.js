import readline from "readline";

import RacingGame from "./RacingGame";
import { INPUT_MSG } from "./contants/messages";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const racingGame = new RacingGame();

rl.question(INPUT_MSG, (answer) => {
  racingGame.cars = answer;
  rl.close();
});

rl.on("close", () => {
  racingGame.start();
  racingGame.getWinners();
  process.exit();
});
