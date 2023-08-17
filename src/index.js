import readline from "readline";

import RacingGame from "./RacingGame";
import { validateNames } from "./utils/validator";
import { print } from "./utils/print";
import { INFORMATION, NEWLINE } from "./contants/messages";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputValue;
rl.question(INFORMATION.INPUT + NEWLINE, (answer) => {
  validateNames(answer);
  inputValue = answer;
  rl.close();
});

rl.on("close", () => {
  const racingGame = new RacingGame(inputValue);
  racingGame.play();
  print(INFORMATION.WINNERS(racingGame.getWinnerNames()));
  process.exit();
});
