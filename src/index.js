import { askCarNames, askMaxRound } from "./view.js";
import Controller, { playGame } from "./controller.js";

async function app() {
  const controller = new Controller();
  controller.initCarNames(askCarNames);
  // const maxRound = await askMaxRound();

  // playGame(carNames, maxRound);
}

app();
