import Race from "../src/domain/Race.js";
import Car from "../src/domain/Car.js";

describe("자동차 경주 테스트", () => {
  let cars;

  beforeEach(() => {
    cars = [new Car("벤틀리"), new Car("캐딜락")];
  });

  it("자동차 경주 횟수를 정할 수 있다.", () => {
    const race = new Race(cars, 5);

    const result = race.start(3);

    const rounds = result.length;
    expect(rounds).toEqual(3);
  });

  it("자동차 경주 횟수는 0 이상의 숫자를 입력해야 한다.", () => {
    const race = new Race(cars);

    expect(() => race.start(0)).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
    expect(() => race.start(-1)).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
    expect(() => race.start("five")).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
  });

  it("경주 마다 자동차 전진 조건을 정할 수 있다", () => {
    // 모든 자동차가 매 라운드마다 전진하도록 조건을 설정
    const ROUND_COUNT = 3;
    const race = new Race(cars);

    const results = race.start(ROUND_COUNT, () => true);

    const lastRound = results[results.length - 1];
    expect(lastRound).toEqual([
      { name: "벤틀리", location: ROUND_COUNT },
      { name: "캐딜락", location: ROUND_COUNT },
    ]);
  });
});
