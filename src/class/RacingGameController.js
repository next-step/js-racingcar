import Cars from "./Cars";
import RacingGameViewer from "./RacingGameViewer";

export default class RacingGameController {
  model;
  view;
  static #CAR_NAME_SEPARATOR = ",";

  constructor(model, view) {
    this.view =
      view instanceof RacingGameViewer ? view : new RacingGameViewer();
    this.model = model instanceof Cars ? model : new Cars();
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

    this.model.addCars(
      carNames.split(RacingGameController.#CAR_NAME_SEPARATOR),
    );
  }

  async setRoundNumber() {
    this.model.roundNumber = await this.view.getRoundNumberInput();
  }

  afterRoundAction = (carStatus) => {
    this.view.printCarStatus(carStatus);
    this.view.printContent("");
  };

  awards() {
    this.view.printWinners(this.model.winners);
  }

  runGame() {
    this.view.printRoundHeader();
    this.model.executeMultipleRounds(this.afterRoundAction);
  }

  async execute() {
    try {
      if (this.model.nextGameStep === Cars.GAME_STEP.SET_CARS) {
        await this.setCars();
      }

      if (this.model.nextGameStep === Cars.GAME_STEP.SET_ROUND_NUMBER) {
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
