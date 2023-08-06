import Validator, { RacingCarGameError } from "./Validator";
import Cars from "./Cars";
import RacingGameViewer from "./RacingGameViewer";

const DEFAULT_RACING_ROUND_NUMBER = 5;

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const RACING_ROUND_INPUT_GUIDE = "시도할 회수는 몇회인가요?\n";

const CAR_NAME_SEPARATOR = ",";

export default class RacingGameController {
  model;
  view;
  #roundNumber;

  constructor(roundNumber = DEFAULT_RACING_ROUND_NUMBER) {
    this.#roundNumber =
      typeof roundNumber === "number"
        ? roundNumber
        : DEFAULT_RACING_ROUND_NUMBER;
    this.view = new RacingGameViewer();
    this.model = new Cars();
  }

  executeMultipleRounds() {
    this.view.printRoundHeader();

    Array.from({ length: this.#roundNumber }, () => {
      this.model.executeOneRound();

      const statusAfterRound = this.model.getAllCarStatus();

      this.view.printCarStatus(statusAfterRound);

      this.view.printContent("");
    });
  }

  handleError(error) {
    if (error instanceof RacingCarGameError) {
      this.view.printContent(error.message);
    }
  }

  async userInputCarNames() {
    try {
      const enteredUserInput = await this.view.getUserInput(
        CAR_NAME_INPUT_GUIDE,
      );

      const carNames = enteredUserInput.split(CAR_NAME_SEPARATOR);

      Validator.validateCarNames(carNames);

      carNames.forEach((car) => this.model.addCar(car));
    } catch (e) {
      this.handleError(e);
    }
  }

  async useInputRacingRound() {
    try {
      const enteredUserInput = await this.view.getUserInput(
        RACING_ROUND_INPUT_GUIDE,
      );

      Validator.validateRoundNumber(enteredUserInput);

      this.setRoundNumber(Number(enteredUserInput));
    } catch (e) {
      this.handleError(e);
    }
  }

  getWinners() {
    const carStatus = this.model.getAllCarStatus();

    const maxDistance = Math.max(...carStatus.map((value) => value.distance));

    return carStatus
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.name);
  }

  getRoundNumber() {
    return this.#roundNumber;
  }

  setRoundNumber(number) {
    this.#roundNumber = number;
  }

  exitGame() {
    this.view.closeViewer();
  }

  async startGame() {
    await this.userInputCarNames();

    await this.useInputRacingRound();

    this.executeMultipleRounds();

    const winners = this.getWinners();

    this.view.printWinners(winners);

    this.exitGame();
  }
}
