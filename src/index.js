import Controller from "./controller.js";
import { askCarNames, askMaxRound } from "./view.js";

async function app() {
  const controller = new Controller();
  await controller.initCarNames(askCarNames, async () => {
    await controller.initMaxRound(askMaxRound);
  });

  controller.playRaceGame();
  controller.finish();
}

app();
