import Race from "../src/domain/Race.js";
import Car from "../src/domain/Car.js";

describe("자동차 경주 테스트", () => {
  it("자동차 경주 횟수를 정할 수 있다.", () => {
    const race = new Race([new Car("벤틀리"), new Car("캐딜락")], 5);

    const result = race.start(3);

    const rounds = result.length;
    expect(rounds).toEqual(5);
  });

  it("자동차 경주 횟수는 0 이상의 숫자를 입력해야 한다.", () => {
    expect(() => new Race([new Car("벤틀리"), new Car("캐딜락")], 0)).toThrow(
      Race.ROUND_COUNT_ERROR_MESSAGE
    );
    expect(
      () => new Race([new Car("벤틀리"), new Car("캐딜락")], "five")
    ).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
  });
});
