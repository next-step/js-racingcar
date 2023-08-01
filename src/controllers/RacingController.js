import ValidationCheck from "../classes/ValidationCheck";

import { createRandomValue, readlineInterface } from "../utils/util";
import { MAX_RACING_ROUNDS, MOVE_CAR_THRESHOLD } from "../data/constants";

export default class RacingController {
  racingModel;
  racingView;

  constructor(model, view) {
    this.racingModel = model;
    this.racingView = view;
    this.isGameErrorOccurred = false;
  }

  initCarNamesBeforeStartRacingGame() {
    readlineInterface.question(
      "자동차의 이름을 입력하세요. (각각의 이름은 콤마로 구분합니다.): ",
      (carNames) => {
        this.startRacingGame(carNames);
      }
    );
  }

  startRacingGame(carNames) {
    const carList = this.settingCarNames(carNames);

    if (!this.isGameErrorOccurred) {
      this.runRacingGame(carList);
    }
  }

  settingCarNames(carNames) {
    const carList = carNames.split(",").map((carName) => carName.trim());

    try {
      this.checkValidationCarNames(carList);
      this.racingModel.settingCarName(carList);
    } catch (error) {
      this.isGameErrorOccurred = true;
      this.racingView.showRacingGameError();
    }

    return carList;
  }

  checkValidationCarNames(carList) {
    ValidationCheck.validateCarCount(carList);
    ValidationCheck.validateEmptyName(carList);
    ValidationCheck.validateDuplicateName(carList);
    ValidationCheck.validateNameLength(carList);
  }

  runRacingGame(carList) {
    for (let i = 0; i < MAX_RACING_ROUNDS; i++) {
      carList.forEach((_, carIndex) => {
        const randomValue = createRandomValue();
        this.playSingleRound(carIndex, randomValue);
      });

      this.racingView.showRacingGameProgress();

      if (i === MOVE_CAR_THRESHOLD) {
        this.racingView.showRacingGameWinners();
        readlineInterface.close();
      }
    }
  }

  playSingleRound(carIndex, randomValue) {
    if (randomValue >= MOVE_CAR_THRESHOLD) this.moveCar(carIndex);
  }

  moveCar(carIndex) {
    this.racingModel.settingCarPosition(carIndex);
  }
}
