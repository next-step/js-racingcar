import RacingCarGameController from "./UI/Controller/RacingCarGameController";

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const racingCarGame = new RacingCarGameController(rl);

racingCarGame.startGame();
