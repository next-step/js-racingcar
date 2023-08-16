import { validateNameList } from "../../UI/Controller/validator";

import { getRandomNumber } from "../../utils/helpers";
import { validateDuplicationItemList } from "../../utils/validator";

import {
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
  RACE_FORWARD_RANDOM_NUMBER_LIMIT,
} from "../../constants/rules";

import { NO_EMPTY_NAME } from "../../constants/errorMessage";

export const DEFAULT_SCORE = "-";

export default class GameTrack {
  constructor() {
    this.gameStatus = [];
  }

  /**
   * CAR_NAME_INPUT_PROMPT - 입력 받은 값
   * @param(string) carNames
   * @throws {Error} MAX_LENGTH_CAR_NAME, duplicateCarName
   * @return [{carName, forward: ""}]
   */

  setGameCarList(carNames) {
    return new Promise((resolve, reject) => {
      try {
        const carNameList = carNames.split(",").map(item => item.trim());
        validateDuplicationItemList(carNameList);
        validateNameList(carNameList, NO_EMPTY_NAME);

        carNameList.forEach(carName =>
          this.gameStatus.push({ carName: carName.trim(), forward: 0 })
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  setAdvanceCarsForward() {
    this.gameStatus.forEach(currentStatus => {
      if (
        getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER) >=
        RACE_FORWARD_RANDOM_NUMBER_LIMIT
      ) {
        currentStatus.forward++;
      }
    });
  }
}
