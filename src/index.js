import readline from "readline";
import { stdin as input, stdout as output } from "process";
import CarRacingManager from "./controller/CarRacingManager";
import { GAME_MESSAGES } from "./constants/constants";

const rl = readline.createInterface({ input, output });
const carRacingManager = new CarRacingManager();

rl.question(GAME_MESSAGES.QUESTION, names => {
  carRacingManager.gameStart(names, () => process.exit());
});
