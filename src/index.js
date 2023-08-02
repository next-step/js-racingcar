import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { CarRace } from "./CarRace";

const rl = readline.createInterface({ input, output });
const rawCarNames = await rl.question(
  "Type in anything and press the enter.\n"
);
rl.close();

const race = new CarRace();
race.init(rawCarNames);
race.run();
