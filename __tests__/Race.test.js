import { App } from "../src";
import { readLineAsync } from "../src/utils";

const TEST_CAR_NAME = "pobi";
const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
  getRandomInRange: jest.fn(),
}));

describe("자동차 경주 게임 테스트", () => {
  afterEach(() => {
    readLineAsync.mockReset();
  });

  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명이다", async () => {
    // given
    readLineAsync.mockResolvedValue(TEST_CAR_NAME);
    const app = new App();

    // when
    await app.play();

    // then
    expect(app.getWinners().length).toBe(1);
  });

  test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상이다.", async () => {
    // given
    readLineAsync.mockResolvedValue(TEST_CAR_NAMES);
    const app = new App();

    // when
    await app.play();

    // then
    expect(app.getWinners().length).toBeGreaterThan(0);
  });
});
