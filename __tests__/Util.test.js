import { getRandomNumber } from "../src/utils/number.js";

describe("Number util 테스트", () => {
  test("randomNumber에 최소값 0, 최대값 9를 넣으면 0과 9사이의 숫자를 반환한다.", () => {
    const randomNumber = getRandomNumber(0, 9);

    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(9);
  });
});
