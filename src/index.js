import { askCarNames } from "./view.js";
import { playGame } from "./controller.js";

async function app() {
  const carNames = await askCarNames();

  playGame(carNames);
}

app();
