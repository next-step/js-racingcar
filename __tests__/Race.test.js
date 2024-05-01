import { ERROR_CODES } from "../src/constants";
import { Race } from "../src/domain";
import {
  DefaultMoveStrategy,
  RandomMoveStrategy,
} from "../src/domain/strategies";
import { getRandom, readLineAsync } from "../src/utils";

const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
  getRandom: jest.fn(),
}));

describe("자동차 경주 게임 테스트", () => {
  afterEach(() => {
    readLineAsync.mockReset();
  });

  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. - DefaultMoveStrategy", async () => {
    // given
    const carNames = TEST_CAR_NAMES.split(",");
    const app = new Race(carNames, new DefaultMoveStrategy());

    // when
    app.race();

    // then
    expect(app.winners.length).toBe(3);
  });

  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. - RandomMoveStrategy", async () => {
    // given
    const carNames = TEST_CAR_NAMES.split(",");
    const app = new Race(carNames, new RandomMoveStrategy());
    getRandom
      .mockReturnValueOnce(RandomMoveStrategy.MOVE_FORWARD_CAR)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    // when
    app.race();

    // then
    expect(app.winners.length).toBe(1);
    expect(app.winners[0].name).toBe(carNames[0]);
  });

  test("라운드마다 전진 조건이 바뀔 수 있다.", async () => {
    // given
    const carNames = TEST_CAR_NAMES.split(",");
    const app = new Race(carNames, new RandomMoveStrategy());
    getRandom.mockReturnValueOnce(RandomMoveStrategy.MOVE_FORWARD_CAR);
    app.setStrategyPerRound(2, new DefaultMoveStrategy());
    app.setStrategyPerRound(3, new DefaultMoveStrategy());
    app.setStrategyPerRound(4, new DefaultMoveStrategy());
    app.setStrategyPerRound(5, new DefaultMoveStrategy());

    // when
    app.race();

    // then
    expect(app.cars[0].position).toBe(5);
    expect(app.cars[1].position).toBeGreaterThan(3);
    expect(app.cars[2].position).toBeGreaterThan(3);
  });

  test("이름이 빈 문자열인 자동차가 존재할 때 종료한다.", async () => {
    // given
    const carNames = ",crong,honux".split(",");

    // when
    const app = () => new Race(carNames);

    // then
    expect(app).toThrow(ERROR_CODES.ERROR_INVALID_CAR_NAME);
  });

  test("중복된 자동차 이름이 존재할 때 종료한다.", async () => {
    // given
    const carNames = "crong,crong,honux".split(",");

    // when
    const app = () => new Race(carNames);

    // then
    expect(app).toThrow(ERROR_CODES.ERROR_DUPLICATE_CAR_NAME);
  });
});
