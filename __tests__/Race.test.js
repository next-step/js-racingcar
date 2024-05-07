import { ERROR_CODES } from "../src/constants";
import { Car, Race } from "../src/domain";
import {
  DefaultMoveStrategy,
  RandomMoveStrategy,
} from "../src/domain/strategies";
import { getRandom } from "../src/utils";

jest.mock("../src/utils", () => ({
  getRandom: jest.fn(),
}));

describe("자동차 경주 게임 테스트", () => {
  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.", async () => {
    // given
    const car1 = new Car("Car1");
    const car2 = new Car("Car2");
    const car3 = new Car("Car3");
    const app = new Race([car1, car2, car3], 5);
    getRandom
      .mockReturnValueOnce(RandomMoveStrategy.MOVE_FORWARD_CAR)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    // when
    app.race(new RandomMoveStrategy());

    // then
    expect(app.winners.length).toBe(1);
    expect(app.winners[0].name).toBe(car1.name);
  });

  test("라운드마다 전진 조건이 바뀔 수 있다.", async () => {
    // given
    const car1 = new Car("Car1");
    const car2 = new Car("Car2");
    const car3 = new Car("Car3");
    const app = new Race([car1, car2, car3], 5);
    getRandom.mockReturnValueOnce(RandomMoveStrategy.MOVE_FORWARD_CAR);
    app.setStrategyPerRound(2, new DefaultMoveStrategy());
    app.setStrategyPerRound(3, new DefaultMoveStrategy());
    app.setStrategyPerRound(4, new DefaultMoveStrategy());
    app.setStrategyPerRound(5, new DefaultMoveStrategy());

    // when
    app.race(new RandomMoveStrategy());

    // then
    expect(app.cars[0].position).toBe(5);
    expect(app.cars[1].position).toBeGreaterThan(3);
    expect(app.cars[2].position).toBeGreaterThan(3);
  });

  test("중복된 자동차 이름이 존재할 때 종료한다.", async () => {
    // given
    const carNames = "crong,crong,honux".split(",");

    // when
    const app = () => new Race(carNames);

    // then
    expect(app).toThrow(ERROR_CODES.ERROR_DUPLICATE_CAR_NAME);
  });

  test("자동차 경주는 N회로 진행한다.", () => {
    // given
    const car1 = new Car("car1");
    const car2 = new Car("car2");
    const car3 = new Car("car3");
    const RACE_ROUND = 5;
    const race = new Race([car1, car2, car3], RACE_ROUND);

    // when
    const raceRound = race.raceRound;

    // then
    expect(raceRound).toBe(RACE_ROUND);
  });

  test("몇 번의 이동을 할 것인지를 0이상의 정수만 사용하능하다", async () => {
    // given
    const car = new Car("car");

    // when + then
    expect(() => new Race([car], "-1")).toThrow(
      ERROR_CODES.ERROR_INVALID_RACE_ROUND
    );
    expect(() => new Race([car], "0.5")).toThrow(
      ERROR_CODES.ERROR_INVALID_RACE_ROUND
    );
    expect(() => new Race([car], "abc")).toThrow(
      ERROR_CODES.ERROR_INVALID_RACE_ROUND
    );
    expect(() => new Race([car], "5")).not.toThrow();
  });
});
