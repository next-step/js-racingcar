import { describe, expect, test } from "@jest/globals";
import { Car } from "../src/domain/Car";
import { CAR_MOVE_CONDITION } from "../src/const/RacingConfig";

describe("자동차 테스트", () => {
  test("자동차의 이름은 5글자 이하여야한다.", () => {
    expect(() => new Car("123456")).toThrowError(
      new Error("자동차의 이름은 5글자 이하여야합니다.")
    );
  });

  test(`자동차는 ${CAR_MOVE_CONDITION} 이상일때 전진한다.`, () => {
    //given
    const car = new Car("test");

    //when
    car.play(CAR_MOVE_CONDITION);

    //then
    expect(car.position).toBe(1);
  });

  test(`자동차는 ${CAR_MOVE_CONDITION} 미만일때 전진하지 않는다.`, () => {
    //given
    const car = new Car("test");

    //when
    car.play(CAR_MOVE_CONDITION - 1);

    //then
    expect(car.position).toBe(0);
  });
});
