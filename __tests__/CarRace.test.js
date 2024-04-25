import Car from "../src/domain/Car";
import CarRace from "../src/domain/CarRace";

describe("자동차 경주 기능 테스트", () => {
  test("자동차 경주는 5회 후 종료된다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const TOTAL_RACE_COUNT = 5;
    const carRace = new CarRace(competitors, TOTAL_RACE_COUNT);

    // when
    carRace.race();
    const remainingRaceCount = carRace.remainingRaceCount;

    // then
    expect(remainingRaceCount).toBe(0);
  });

  test("자동차 경주 게임을 완료하면 누가 우승했는지 알려준다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const TOTAL_RACE_COUNT = 5;
    const carRace = new CarRace(competitors, TOTAL_RACE_COUNT);

    // when
    carRace.race();
    const winners = carRace.winners;

    // then
    expect(winners.length).toBeGreaterThanOrEqual(1);
  });
});
