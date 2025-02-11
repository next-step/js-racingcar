import { CAR_RACE_CONFIG } from "../src/constants.js";
import Validator from "../src/Validator.js";

describe("자동차 이름 검증", () => {
  test("자동차 이름 입력값이 없는 경우", () => {
    expect(() => Validator.carNameValidate("")).toThrow(
      "자동차 이름 입력값이 비었습니다."
    );
  });
  test(`자동차 이름이 ${CAR_RACE_CONFIG.MAX_NAME_LENGTH}글자를 초과한 경우`, () => {
    expect(() => Validator.carNameValidate("다섯글자이상")).toThrow(
      `자동차 이름은 ${CAR_RACE_CONFIG.MAX_NAME_LENGTH}자 이하만 가능합니다.`
    );
  });
});
