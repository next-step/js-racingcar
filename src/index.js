import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { CarRace } from "./CarRace";

const play = (userInput) => {
  const race = new CarRace(userInput);
  race.run();
};

const rl = readline.createInterface({ input, output });

rl.question("Type in anything and press the enter.\n").then((userInput) => {
  rl.close();
  play(userInput);
});
