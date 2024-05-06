import Car from "../src/domain/Car.js";
import CarRace from "../src/domain/CarRace.js";

describe("자동차 경주 기능 테스트", () => {
  test("자동차 경주가 종료되었을 때 현재 position 값이 가장 큰 자동차가 우승한다.", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const carRace = new CarRace([car1, car2, car3]);

    // when
    car1.move();
    const winners = carRace.winners;
    const winnerNames = winners.map((winner) => winner.name);

    // then
    expect(winnerNames).toStrictEqual(["ganu"]);
  });

  test("자동차 경주가 종료되었을 때 한 개 이상의 자동차가 우승한다.", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const car3 = new Car("banu");
    const carRace = new CarRace([car1, car2, car3]);

    // when
    carRace.race();
    const winners = carRace.winners;

    // then
    expect(winners.length).toBeGreaterThanOrEqual(1);
  });
});
