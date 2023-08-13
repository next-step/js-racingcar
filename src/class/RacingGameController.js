import { RacingCarGameError } from "./Validator";
import Cars from "./Cars";
import RacingGameViewer from "./RacingGameViewer";

export default class RacingGameController {
  model;
  view;

  constructor(model, view) {
    this.view =
      view instanceof RacingGameViewer ? view : new RacingGameViewer();
    this.model = model instanceof Cars ? model : new Cars();
  }

  async handleError(error) {
    if (error instanceof RacingCarGameError) {
      this.view.printContent(error.message);

      await this.execute();
    }
  }

  exitGame() {
    this.view.closeViewer();
  }

  async setCars() {
    const carNames = await this.view.getCarNamesInput();

    this.model.initializeCarsFromString(carNames);
  }

  async setRoundNumber() {
    const roundNumber = await this.view.getRoundNumberInput();

    this.model.setRoundNumber(roundNumber);
  }

  afterRoundAction = (carStatus) => {
    this.view.printCarStatus(carStatus);
    this.view.printContent("");
  };

  awards() {
    this.view.printWinners(this.model.getWinners());
  }

  runGame() {
    this.view.printRoundHeader();
    this.model.executeMultipleRounds(this.afterRoundAction);
  }

  async execute() {
    try {
      if (this.model.nextGameStep === this.model.GAME_STEP.SET_CARS) {
        await this.setCars();
      }

      if (this.model.nextGameStep === this.model.GAME_STEP.SET_ROUND_NUMBER) {
        await this.setRoundNumber();
      }

      this.runGame();

      this.awards();
    } catch (e) {
      await this.handleError(e);
    } finally {
      this.exitGame();
    }
  }
}
