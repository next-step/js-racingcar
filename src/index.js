import Race from "./domain/Race.js";
import Controller from "./controller.js";
import View from "./view.js";

export async function app(controller) {
  await controller.initCarNames(view.askCarNames);
  await controller.initMaxRound(view.askMaxRound);

  controller.playRaceGame();

  controller.finish();
}

const view = new View();
const race = new Race();
const controller = new Controller(view, race);
app(controller);
