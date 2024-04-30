import { askCarNames, askMaxRound } from "./view.js";
import { playGame } from "./controller.js";

async function app() {
  const carNames = await askCarNames();
  const maxRound = await askMaxRound();

  playGame(carNames, maxRound);
}

app();
