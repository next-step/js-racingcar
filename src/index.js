import readline from "readline";
import { stdin as input, stdout as output } from "process";
import { CarRacingManager } from "./controller/CarRacingManager.js";
import { GAME_MESSAGES } from "./constants/constants.js";

const rl = readline.createInterface({ input, output });
const carRacingManager = new CarRacingManager();

rl.question(GAME_MESSAGES.QUESTION, (input) => {
  carRacingManager.gameStart(input, () => process.exit());
});
