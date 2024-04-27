import { askCarNames, playGame } from "./controller.js";

async function app() {
  const carNames = await askCarNames();
  playGame(carNames);
}

app();
