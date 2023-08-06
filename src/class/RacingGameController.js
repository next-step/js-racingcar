import Validator, { RacingCarGameError } from "./Validator";

const DEFAULT_RACING_ROUND_NUMBER = 5;

const CAR_ADVANCE_THRESHOLD_NUMBER = 4;

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const RACING_ROUND_INPUT_GUIDE = "시도할 회수는 몇회인가요?\n";

const CAR_NAME_SEPARATOR = ",";

export default class RacingGameController {
  model;
  view;
  #roundNumber;

  constructor({ roundNumber = DEFAULT_RACING_ROUND_NUMBER, view, model }) {
    this.#roundNumber = roundNumber;
    this.view = view;
    this.model = model;
  }

  executeOneRound() {
    const carStatus = this.model.getCarStatus();

    carStatus.forEach((carInfo) => {
      if (this.checkForAdvance()) {
        carInfo.distance += 1;
      }
    });

    this.model.setCarStatus(carStatus);

    this.view.printCarStatus(carStatus);
  }

  executeMultipleRounds() {
    this.view.printRoundHeader();

    Array.from({ length: this.#roundNumber }, () => {
      this.executeOneRound();
      this.view.printContent("");
    });
  }

  checkForAdvance() {
    return Math.random() * 9 >= CAR_ADVANCE_THRESHOLD_NUMBER;
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

      this.model.setCarStatus(
        new Map(carNames.map((car) => [car, { distance: 0 }])),
      );
    } catch (e) {
      this.handleError(e);
      await this.userInputCarNames();
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
      await this.useInputRacingRound();
    }
  }

  getWinners() {
    const carStatus = this.model.getCarStatus();

    const maxDistance = Math.max(
      ...[...carStatus.values()].map((value) => value.distance),
    );

    return [...carStatus.keys()].filter(
      (car) => carStatus.get(car).distance === maxDistance,
    );
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
