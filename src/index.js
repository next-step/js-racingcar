import readline from "readline";
import { stdin as input, stdout as output } from "process";
import { CarRacingManager, GAME_MESSAGES } from "./CarRacingManager.js";

const rl = readline.createInterface({ input, output });
const carRacingManager = new CarRacingManager();

rl.question(GAME_MESSAGES.QUESTION, (input) => {
  carRacingManager.receiveNames(input, () => process.exit());
  console.log("게임진행중");
});

rl.on("close", (message) => {
  console.log("readline close");
});
