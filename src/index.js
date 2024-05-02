import { askCarNames, askMaxRound } from "./view.js";
import Controller from "./controller.js";

async function app() {
  const controller = new Controller();
  await controller.initCarNames(askCarNames, async () => {
    await controller.initMaxRound(askMaxRound);
  });

  controller.playRaceGame();
  controller.finish();
}

app();
