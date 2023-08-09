import RacingCarGameController from "./domain/controller/RacingCarGameController";

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const racingCarGame = new RacingCarGameController(rl);

racingCarGame.startGame();
