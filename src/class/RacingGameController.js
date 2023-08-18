import RacingGameViewer from "./RacingGameViewer";
import RacingGame from "./RacingGame";

export default class RacingGameController {
  model;
  view;
  static #CAR_NAME_SEPARATOR = ",";

  constructor(model, view) {
    this.view =
      view instanceof RacingGameViewer ? view : new RacingGameViewer();
    this.model = model instanceof RacingGame ? model : new RacingGame();
  }

  async handleError(error) {
    this.view.printContent(error.message);

    await this.execute();
  }

  exitGame() {
    this.view.closeViewer();
  }

  async setCars() {
    const carNames = await this.view.getCarNamesInput();

    this.model.cars = carNames.split(RacingGameController.#CAR_NAME_SEPARATOR);
  }

  async setRoundNumber() {
    this.model.roundNumber = await this.view.getRoundNumberInput();
  }

  afterRoundAction = (carStatus) => {
    this.view.printCarStatus(carStatus);
    this.view.printContent("");
  };

  awards() {
    this.view.printWinners(this.model.cars.winners);
  }

  runGame() {
    this.view.printRoundHeader();
    this.model.executeMultipleRounds(this.afterRoundAction);
  }

  async execute() {
    try {
      if (this.model.nextGameStep === RacingGame.GAME_STEP.SET_CARS) {
        await this.setCars();
      }

      if (this.model.nextGameStep === RacingGame.GAME_STEP.SET_ROUND_NUMBER) {
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
