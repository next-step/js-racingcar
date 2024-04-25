import { describe, expect, test } from "@jest/globals";
import { Car } from "../src/domain/Car";
import { Round } from "../src/domain/Round";

describe("라운드 테스트", () => {
  test("라운드를 진행할 자동차 목록을 받는다.", () => {
    //given
    const car1 = new Car("car1");
    const car2 = new Car("car2");

    //when
    const round = new Round([car1, car2]);

    //then
    expect(round.cars.length).toBe(2);
  });
});
