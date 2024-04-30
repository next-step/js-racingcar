import { askCarNames, askMaxRound } from "./view.js";
import Controller, { playGame } from "./controller.js";

async function app() {
  const controller = new Controller();
  await controller.initCarNames(askCarNames, async () => {
    await controller.initMaxRound(askMaxRound);
  });
  // const maxRound = await askMaxRound();

  // playGame(carNames, maxRound);
}

app();
