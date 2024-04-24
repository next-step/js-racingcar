import { describe, expect, test } from "@jest/globals";
import { Car } from "../src/domain/Car";

describe("자동차 테스트", () => {
  test("자동차의 이름은 5글자 이하여야한다.", () => {
    expect(() => new Car("123456")).toThrowError(
      new Error("자동차의 이름은 5글자 이하여야합니다.")
    );
  });
});
