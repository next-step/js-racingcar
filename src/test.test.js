import { startRacingGame } from ".";
import { isValidationName } from "./domain/isValidationName";
import { getRandomNumber } from "./utils/getRandomNumber";
import { attemptCount } from "./domain/attemptCount";

describe("자동차 이름 유효성 검사", () => {
  it("아무것도 등록하지 않았을 때", () => {
    expect(isValidationName()).toBeFalsy();
  });

  it("자동차 이름 최대 5글자", () => {
    expect(isValidationName("pobi,crong,honux")).toBeTruthy();
  });

  it("자동차 개수 최소 2개", () => {
    expect(isValidationName("pobi,crong")).toBeTruthy();
  });
});

describe("0 에서 9 사이의 무작위 값을 구한 후 4이 상일 때 전진한다.", () => {
  it("0~9 숫자만 출력된다.", () => {
    expect(getRandomNumber()).toBeLessThan(10);
  });
});

describe("자동차 경주 시도할 횟수", () => {
  it("0 이하의 숫자를 입력 했을떄 에러메세지", () => {
    expect(() => attemptCount(["ss", "33", "r4"], -1)).toThrowError(
      "0 이상의 숫자를 입력해주세요!"
    );
  });
});

describe("자동차 경주", () => {
  it("자동차 등록을 잘못할 경우 에러메세지", () => {
    expect(() => startRacingGame("", 7)).toThrowError(
      "잘못된 정보를 입력하여 게임을 종료합니다."
    );
  });
});
