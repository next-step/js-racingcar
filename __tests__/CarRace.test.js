import { getRandomNumber } from "../src/utils/number.js";
import { displayForwardCar } from "../src/view.js";
import Car from "../src/domain/Car.js";
import Controller, { playGame } from "../src/controller.js";
import Race from "../src/domain/Race.js";

describe("자동차 경주 규칙 구현", () => {
  test("경주는 주어진 횟수동안 진행한다.", () => {
    //given
    const race = new Race();
    race.maxRound = 5;

    //when
    race.playRace();

    //then
    expect(race.currentRound).toBe(5);
  });

  test("레이스에서 가장 많이 이동한 자동차가 우승자가 된다.", () => {
    //given
    const race = new Race();
    race.cars = ["pobi", "crong", "honux"];

    //when
    race.cars[1].move(4);
    race.cars[1].move(4);

    //then
    expect(race.winners).toEqual([race.cars[1]]);
  });
});
