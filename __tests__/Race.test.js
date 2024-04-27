import { App } from "../src";
import { ERROR_CODES } from "../src/constants";
import { Race } from "../src/domain";
import { readLineAsync } from "../src/utils";

const TEST_CAR_NAME = "pobi";
const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
  getRandom: jest.fn(),
}));

describe("자동차 경주 게임 테스트", () => {
  afterEach(() => {
    readLineAsync.mockReset();
  });

  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.", async () => {
    // given
    readLineAsync.mockResolvedValue(TEST_CAR_NAME);
    const app = new App();

    // when
    await app.play();

    // then
    expect(app.getRace().getWinners().length).toBe(1);
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
