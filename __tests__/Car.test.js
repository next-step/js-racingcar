import { describe, expect, test } from "@jest/globals";
import { Car } from "../src/domain/Car";

describe("자동차 테스트", () => {
  test("자동차의 이름은 문자열이어야한다.", () => {
    expect(() => new Car(1)).toThrowError(new Error("잘못된 입력입니다."));
  });

  test("자동차의 이름은 빈 문자열일 수 없다.", () => {
    expect(() => new Car("")).toThrowError(new Error("잘못된 입력입니다."));
  });

  test("자동차의 이름은 5글자 이하여야한다.", () => {
    expect(() => new Car("123456")).toThrowError(
      new Error("자동차의 이름은 5글자 이하여야합니다.")
    );
  });

  test("자동차는 1씩 전진할 수 있다.", () => {
    //given
    const car = new Car("test");

    //when
    car.move();

    //then
    expect(car.position).toBe(1);
  });
});
