import { isValidateInputLength } from "../src/utils/helpers";

describe("자동차 이름 입력", () => {
  test("이름은 빈값이 아니고, 1~5자만 가능한지 확인한다.", () => {
    const validCarNames = ["kim", "lee", "frank", "a", "b"];
    const invalidCarNames = ["kimkim", "leelee", "frankfrank", ""];

    validCarNames.forEach(carName => {
      expect(isValidateInputLength(carName)).toBe(true);
    });

    invalidCarNames.forEach(carName => {
      expect(isValidateInputLength(carName)).toBe(false);
    });
  });
});
