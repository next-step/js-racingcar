import Race from "./domain/Race.js";
import Controller from "./controller.js";
import { askCarNames, askMaxRound } from "./view.js";

async function app(controller) {
  await controller.initCarNames(askCarNames);
  await controller.initMaxRound(askMaxRound);

  controller.playRaceGame();

  controller.finish();
}

const race = new Race();
const controller = new Controller(race);
app(controller);
