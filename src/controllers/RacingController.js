import ValidationCheck from "../classes/ValidationCheck";
import RacingModel from "../model/RacingModel";
import RacingView from "../view/RacingView";

import { createRandomValue, readlineInterface } from "../utils/util";
import { MAX_RACING_ROUNDS, MOVE_CAR_THRESHOLD } from "../data/constants";

export default class RacingController {
  racingModel;
  racingView;

  constructor() {
    this.racingModel = new RacingModel();
    this.racingView = new RacingView(this.racingModel);
  }

  initCarNamesBeforeStartRacingGame() {
    readlineInterface.question(
      "자동차의 이름을 입력하세요. (각각의 이름은 콤마로 구분합니다.): ",
      (carNames) => {
        this.checkValidationCarNames(carNames);
      }
    );
  }

  checkValidationCarNames(carNames) {
    const carList = carNames.split(",").map((carName) => carName.trim());

    const validation = new ValidationCheck();

    try {
      validation.validateCarCount(carList);
      validation.validateEmptyName(carList);
      validation.validateDuplicateName(carList);
      validation.validateNameLength(carList);

      this.racingModel.settingCarName(carList);
      this.startRacingGame();
    } catch (error) {
      readlineInterface.close();
    }
  }

  startRacingGame() {
    const carList = this.racingModel.getCarInfo();

    for (let i = 0; i < MAX_RACING_ROUNDS; i++) {
      carList.forEach((_, carIndex) => {
        const randomValue = createRandomValue();

        if (randomValue >= MOVE_CAR_THRESHOLD) this.moveCar(carIndex);
      });

      this.racingView.showRacingGameProgress();

      if (i === MOVE_CAR_THRESHOLD) {
        this.racingView.showRacingGameWinners();
        this.readlineInterface.close();
      }
    }
  }

  moveCar(carIndex) {
    this.racingModel.settingCarPosition(carIndex);
  }
}
