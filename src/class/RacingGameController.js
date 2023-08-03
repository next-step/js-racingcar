const DEFAULT_RACING_ROUND_NUMBER = 5;

const CAR_NAME_MAX_LENGTH = 5;
const CAR_NAME_MIN_LENGTH = 1;

const CAR_ADVANCE_THRESHOLD_NUMBER = 4;

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const CAR_NAME_SEPARATOR = ",";

const RACING_SCORE_CHAR = "-";

const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
  DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
};

const RACING_CAR_ERROR_NAME = "RACING_CAR_ERROR";

const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";

class RacingCarGameError extends Error {
  constructor(message) {
    super(message);
    this.name = RACING_CAR_ERROR_NAME;
  }
}

export default class RacingGameController {
  model;
  view;

  constructor({ roundNumber = DEFAULT_RACING_ROUND_NUMBER, view, model }) {
    this.roundNumber = roundNumber;
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

    this.view.printContent(
      [...carStatus.keys()]
        .map(
          (car) =>
            `${car} : ${RACING_SCORE_CHAR.repeat(carStatus.get(car).distance)}`,
        )
        .join("\n"),
    );
  }

  executeMultipleRounds() {
    this.view.printContent("\n실행결과");

    Array.from({ length: this.roundNumber }, () => {
      this.executeOneRound();
      this.view.printContent("");
    });
  }

  checkForAdvance() {
    return Math.random() * 9 >= CAR_ADVANCE_THRESHOLD_NUMBER;
  }

  validateCarNames = (names) => {
    for (const name of names) {
      if (name.trim().length < CAR_NAME_MIN_LENGTH) {
        throw new RacingCarGameError(ERROR_MESSAGES.INVALID_EMPTY_NAME);
      }

      if (name.length > CAR_NAME_MAX_LENGTH) {
        throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_LENGTH);
      }
    }

    const uniqueCarNames = new Set(names.map((name) => name.trim()));

    if (names.length !== uniqueCarNames.size) {
      throw new RacingCarGameError(ERROR_MESSAGES.DUPLICATE_CAR_NAME);
    }
  };

  handleError(error) {
    if (error instanceof RacingCarGameError) {
      console.log(error.message);
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

  async startGame() {
    try {
      const enteredUserInput = await this.view.getUserInput(
        CAR_NAME_INPUT_GUIDE,
      );

      const carNames = enteredUserInput.split(CAR_NAME_SEPARATOR);

      this.validateCarNames(carNames);

      this.model.setCarStatus(
        new Map(carNames.map((car) => [car, { distance: 0 }])),
      );

      this.executeMultipleRounds();
    } catch (error) {
      this.handleError(error);
    } finally {
      const winners = this.getWinners();

      this.view.printContent(
        `${winners.join(",")}${WINNER_ANNOUNCEMENT_MESSAGE}`,
      );

      this.view.closeViewer();
    }
  }
}
