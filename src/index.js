import RacingCarGameController from "./controller/RacingCarGameController.js";

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const racingCarGame = new RacingCarGameController(rl);

racingCarGame.startGame();
