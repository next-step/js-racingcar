import Race from "../src/domain/Race.js";
import Car from "../src/domain/Car.js";
import RaceCondition, {
  FakeRandomNumberGenerator,
} from "../src/domain/RaceCondition.js";

describe("자동차 경주 테스트", () => {
  let cars;
  let race;

  beforeEach(() => {
    cars = [new Car("벤틀리"), new Car("캐딜락")];
    race = new Race(cars);
  });

  it("자동차 경주 횟수를 정할 수 있다.", () => {
    const result = race.start(3);

    const rounds = result.length;
    expect(rounds).toEqual(3);
  });

  it("자동차 경주 횟수는 0 이상의 숫자를 입력해야 한다.", () => {
    expect(() => race.start(0)).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
    expect(() => race.start(-1)).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
    expect(() => race.start("five")).toThrow(Race.ROUND_COUNT_ERROR_MESSAGE);
  });

  it("자동차는 0 이상 9 이하의 무작위 값 중 4 이상이 나온 경우 전진한다", () => {
    const randomNumberGenerator = new FakeRandomNumberGenerator(4);
    const raceCondition = new RaceCondition(randomNumberGenerator);

    const result = race.start(2, raceCondition.check.bind(raceCondition));

    expect(result).toEqual([
      [
        { name: "벤틀리", location: 1 },
        { name: "캐딜락", location: 1 },
      ],
      [
        { name: "벤틀리", location: 2 },
        { name: "캐딜락", location: 2 },
      ],
    ]);
  });

  it("자동차는 0 이상 9 이하의 무작위 값 중 3 이하가 나온 경우 전진하지 않는다.", () => {
    const randomNumberGenerator = new FakeRandomNumberGenerator(3);
    const raceCondition = new RaceCondition(randomNumberGenerator);

    const result = race.start(2, raceCondition.check.bind(raceCondition));

    expect(result).toEqual([
      [
        { name: "벤틀리", location: 0 },
        { name: "캐딜락", location: 0 },
      ],
      [
        { name: "벤틀리", location: 0 },
        { name: "캐딜락", location: 0 },
      ],
    ]);
  });

  it("자동차 경주 매 라운드마다 전진 조건을 다르게 설정할 수 있다.", () => {
    const firstResult = race.start(1, () => true);
    const secondResult = race.start(1, () => false);

    expect([firstResult[0], secondResult[0]]).toEqual([
      [
        { name: "벤틀리", location: 1 },
        { name: "캐딜락", location: 1 },
      ],
      [
        { name: "벤틀리", location: 1 },
        { name: "캐딜락", location: 1 },
      ],
    ]);
  });

  it("가장 멀리 이동한 자동차가 우승자로 선정된다.", () => {
    race.start(2);
    const carA = cars[0];
    const carB = cars[1];

    const winners = race.getWinners();

    if (carA.location > carB.location) {
      expect(winners).toEqual([carA.name]);
    }

    if (carB.location > carA.location) {
      expect(winners).toEqual([carB.name]);
    }

    if (carA.location === carB.location) {
      expect(winners).toEqual([carA.name, carB.name]);
    }
  });
});
