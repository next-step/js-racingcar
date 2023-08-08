import readline from "readline";
import { stdin as input, stdout as output } from "process";
import CarRacingManager from "./controller/CarRacingManager.js";
import { GAME_MESSAGES } from "./constants/constants.js";

const rl = readline.createInterface({ input, output });
const carRacingManager = new CarRacingManager();

rl.question(GAME_MESSAGES.ASK_NAMES, names => {
  rl.question(GAME_MESSAGES.ASK_TRY_ROUND_COUNT, totalRound => {
    carRacingManager.gameStart(names, process.exit, totalRound);
  });
});
