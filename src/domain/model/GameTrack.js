import { ERROR_MESSAGE } from "../../constants/ErrorMessage";

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
      if (this.isValidCarDuplicateName(carName.trim())) {
        throw new Error(ERROR_MESSAGE.duplicateName);
      }

      this.gameStatus.push({ carName: carName.trim(), forward: "" });
    });
  }

  /** 자동차 이름 중복처리 */
  isValidCarDuplicateName(carName) {
    return this.gameStatus.some(car => car.carName === carName);
  }
}
