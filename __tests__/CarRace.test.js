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

  test("라운드 별 자동차의 이동 상태를 기록한다.", () => {
    //given
    const race = new Race();
    race.cars = ["pobi", "crong", "honux"];

    //when
    race.playRound();
    race.playRound();
    race.playRound();

    //then
    const round1Index = 0;
    expect(race.records.at(round1Index)).toEqual([
      { name: "pobi", position: race.cars[0].position },
      { name: "crong", position: race.cars[1].position },
      { name: "honux", position: race.cars[2].position },
    ]);

    const round2Index = 1;
    expect(race.records.at(round2Index)).toEqual([
      { name: "pobi", position: race.cars[0].position },
      { name: "crong", position: race.cars[1].position },
      { name: "honux", position: race.cars[2].position },
    ]);

    const round3Index = 2;
    expect(race.records.at(round3Index)).toEqual([
      { name: "pobi", position: race.cars[0].position },
      { name: "crong", position: race.cars[1].position },
      { name: "honux", position: race.cars[2].position },
    ]);
  });

  test("레이스에서 가장 많이 이동한 자동차가 우승자가 된다.", () => {
    //given
    const race = new Race();
    race.cars = ["pobi", "crong", "honux"];

    //when
    race.cars[1].moveForward();
    race.cars[1].moveForward();

    //then
    expect(race.winners).toEqual([race.cars[1]]);
  });

  test("주어진 숫자가 4이상인 경우에 자동차는 전진한다.", () => {
    //given
    const race = new Race();
    race.cars = ["pobi", "crong", "honux"];
    const pobiCar = race.cars[0];

    //when
    race.moveCarWithNumberCondition(pobiCar, 4);

    //then
    expect(pobiCar.position).toBe(1);
  });

  test("주어진 숫자가 4미만인 경우에 자동차는 정지한다.", () => {
    //given
    const race = new Race();
    race.cars = ["pobi", "crong", "honux"];
    const pobiCar = race.cars[0];

    //when
    race.moveCarWithNumberCondition(pobiCar, 3);

    //then
    expect(pobiCar.position).toBe(0);
  });
});
