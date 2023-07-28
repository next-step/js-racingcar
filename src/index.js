import readline from "readline";
import { stdin as input, stdout as output } from "process";
import { CarRacingManager } from "./CarRacingManager.js";

const rl = readline.createInterface({ input, output });
const carRacingManager = new CarRacingManager();

rl.question("test", (input) => {
  carRacingManager.gameStart(input, () => process.exit());
});
