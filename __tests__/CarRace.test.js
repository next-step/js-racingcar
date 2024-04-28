import Car from "../src/domain/Car.js";
import CarRace from "../src/domain/CarRace.js";

describe("자동차 경주 기능 테스트", () => {
  test("자동차 경주는 5회 후 종료된다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const carRace = new CarRace(competitors);

    // when
    carRace.race();
    const remainingRaceCount = carRace.remainingRaceCount;

    // then
    expect(remainingRaceCount).toBe(0);
  });

  test("position 값이 가장 큰 사람이 우승한다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const carRace = new CarRace(competitors);

    // when
    car1.move();
    car3.move();
    const winners = carRace.winners;
    const winnerNames = winners.map((winner) => winner.name);

    // then
    const expectedWinnerNames = [car1.name, car3.name];
    expect(winnerNames).toEqual(expect.arrayContaining(expectedWinnerNames));
  });

  test("자동차 경주 게임을 완료하면 누가 우승했는지 알려준다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const carRace = new CarRace(competitors);

    // when
    carRace.race();
    const winners = carRace.winners;

    // then
    expect(winners.length).toBeGreaterThanOrEqual(1);
  });
});
