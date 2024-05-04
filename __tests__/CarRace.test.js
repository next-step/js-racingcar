import Car from "../src/domain/Car.js";
import CarRace from "../src/domain/CarRace.js";

describe("자동차 경주 기능 테스트", () => {
  test("자동차 경주는 임의의 0 이상의 정수 개의 라운드로 이루어져있다.", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const RANDOM_RACE_COUNT = Math.floor(Math.random() * 10);
    const carRace = new CarRace(competitors, RANDOM_RACE_COUNT);

    // when
    carRace.race();
    const remainingRoundsCount = carRace.remainingRoundsCount;

    // then
    expect(remainingRoundsCount).toBe(0);
  });

  test("자동차 경주는 여러 개의 라운드로 이루어져 있으며, 각 라운드가 종료되면 자동차들의 위치 값이 roundResults에 추가된다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("buhu");
    const carRace = new CarRace([car1, car2, car3], 2);

    // when
    carRace.race();

    // then
    const roundResults = carRace.roundResults;
    expect(roundResults.length).toBe(2);
    expect(roundResults.at(0).length).toBe(3);
  });

  test("자동차 경주는 여러 개의 라운드로 이루어져 있으며, 모든 라운드가 종료되었을 때 현재 position 값이 가장 큰 자동차가 우승한다.", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const competitors = [car1, car2, car3];
    const carRace = new CarRace(competitors);

    // when
    car1.move();
    const winners = carRace.winners;
    const winnerNames = winners.map((winner) => winner.name);

    // then
    expect(winnerNames).toStrictEqual(["ganu"]);
  });

  test("자동차 경주는 여러 개의 라운드로 이루어져 있으며, 모든 라운드가 종료되었을 때 한 개 이상의 자동차가 우승한다.", () => {
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
