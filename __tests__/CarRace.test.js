import Controller from "../src/controller.js";
import Race from "../src/domain/Race.js";

describe("자동차 경주 규칙 구현", () => {
  test("경주는 주어진 횟수동안 진행한다.", async () => {
    //given
    const controller = new Controller();
    const getCarNames = () => "pobi,crong,honux";
    const getRound = () => 5;
    await controller.initCarNames(getCarNames);
    await controller.initMaxRound(getRound);

    //when
    controller.playRaceGame();

    //then
    const raceCount = controller.race.records.length;
    expect(raceCount).toBe(5);
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
