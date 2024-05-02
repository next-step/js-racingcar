import { describe, expect, test } from "@jest/globals";
import { Car } from "../src/domain/Car";
import { Round } from "../src/domain/Round";
import { CAR_MOVE_CONDITION } from "../src/const/RacingConfig";

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

  test("라운드에 중복된 이름의 차가 있을 수 없다.", () => {
    //given
    const sameCar1 = new Car("same");
    const sameCar2 = new Car("same");

    //then
    expect(() => new Round([sameCar1, sameCar2])).toThrowError(
      new Error("중복된 이름의 자동차가 있습니다.")
    );
  });

  test(`자동차는 ${CAR_MOVE_CONDITION} 이상일때 전진한다.`, () => {
    //given
    const car = new Car("test");
    const round = new Round([car]);

    //when
    const isOk = round.isOkToMove(CAR_MOVE_CONDITION);

    //then
    expect(isOk).toBe(true);
  });

  test(`자동차는 ${CAR_MOVE_CONDITION} 미만일때 전진하지 않는다.`, () => {
    //given
    const car = new Car("test");
    const round = new Round([car]);

    //when
    const isOk = round.isOkToMove(CAR_MOVE_CONDITION - 1);

    //then
    expect(isOk).toBe(false);
  });

  test("라운드 1등을 리턴한다.", () => {
    //given
    const winner1 = new Car("car1");
    const winner2 = new Car("car2");
    const loser = new Car("car3");

    winner1.move();
    winner2.move();

    const racing = new Round([winner1, winner2, loser]);

    //when
    const winners = racing.winners;

    //then
    expect(winners).toEqual([winner1, winner2]);
  });
});
