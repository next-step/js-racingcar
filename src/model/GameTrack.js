import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { isValidInputLength } from "../utils/helpers";

export default class GameTrack {
  constructor() {
    this.gameStatus = [];
  }

  /**
   * CAR_NAME_INPUT_PROMPT - 입력 받은 값
   * @param(string) carNames
   * @throws {Error} maxCarNameLength, duplicateCarName
   * @return [{carName, forward: ""}]
   */
  setGameStatus(carNames) {
    carNames.split(",").forEach(carName => {
      if (!isValidInputLength(carName.trim()))
        throw Error(ERROR_MESSAGE.maxCarNameLength);

      if (this.isValidCarDuplicateName(carName.trim())) {
        throw new Error(ERROR_MESSAGE.duplicateCarName);
      }

      this.gameStatus.push({ carName: carName.trim(), forward: "" });
    });
  }

  /** 자동차 이름 중복처리 */
  isValidCarDuplicateName(carName) {
    return this.gameStatus.some(car => car.carName === carName);
  }
}
