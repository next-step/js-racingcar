import { isNumber } from "../src/util";

describe("isNumber() 테스트", () => {
  test("숫자를 넣으면 true가 반환된다.", () => {
    const result = isNumber(4);

    expect(result).toBe(true);
  });

  test("빈값을 넣으면 false가 반환된다.", () => {
    const result = isNumber();

    expect(result).toBe(false);
  });

  test("문자열을 넣으면 false가 반환된다.", () => {
    const result = isNumber("ㅁㄴㅇㄹ");

    expect(result).toBe(false);
  });
});
