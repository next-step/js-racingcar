import RacingGameController from "./class/RacingGameController";
import RacingGameViewer from "./class/RacingGameViewer";
import Car from "./class/Car";

const RACING_ROUNDS = 5;

const racingCarGame = new RacingGameController({
  roundNumbers: RACING_ROUNDS,
  view: new RacingGameViewer(),
  model: new Car(),
});

racingCarGame.startGame();
