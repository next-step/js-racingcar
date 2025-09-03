import { assert } from "../utils/assert.js";

export class GameValidator {
  static validateRacingTimes(racingTimes) {
    assert(typeof racingTimes === "number" && !Number.isNaN(racingTimes), "시도할 회수는 숫자값을 입력해주세요");
  }
}
