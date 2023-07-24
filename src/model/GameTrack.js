import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { MAX_RANDOM_NUMBER, MIN_RANDOM_NUMBER } from "../constants/rules";
import { getRandomNumber, isValidateInputLength } from "../utils/helpers";

export default class GameTrack {
  constructor() {
    this.gameStatus = [];
  }

  static DEFAULT_SCORE = "-";

  /**
   * CAR_NAME_INPUT_PROMPT - 입력 받은 값
   * @param(string) carNames
   * @throws {Error} maxCarNameLength, duplicateCarName
   * @return [{carName, forward: ""}]
   */
  setGameStatus(carNames) {
    carNames.split(",").forEach(carName => {
      if (!isValidateInputLength(carName.trim()))
        throw Error(ERROR_MESSAGE.maxCarNameLength);

      if (this.isValidateCarDuplicateName(carName.trim())) {
        throw new Error(ERROR_MESSAGE.duplicateCarName);
      }

      this.gameStatus.push({ carName: carName.trim(), forward: "" });
    });
  }

  /** 전진 할 수 있는 메소드 */
  setAdvanceCars() {
    for (let i = 0; i < this.gameStatus.length; i++) {
      if (getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER) === true) {
        this.gameStatus[i]["forward"] += GameTrack.DEFAULT_SCORE;
      }
    }
  }

  /** 자동차 이름 중복처리 */
  isValidateCarDuplicateName(carName) {
    return this.gameStatus.some(car => car.carName === carName);
  }
}
