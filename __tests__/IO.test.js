import { App } from "../src";
import { ERROR_MESSAGES } from "../src/constants";
import { readLineAsync } from "../src/utils";

const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
  getRandom: jest.fn(),
}));

describe("입/출력 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    readLineAsync.mockReset();
    jest.restoreAllMocks();
  });

  test("자동차를 출력할 때 쉼표(,)를 기준으로 구분하며 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async () => {
    // given
    readLineAsync.mockResolvedValue(TEST_CAR_NAMES);
    const app = new App();

    // when
    await app.play();

    // then
    const logs = [["pobi : "], ["crong : "], ["honux : "]].map((log) =>
      JSON.stringify(log)
    );
    const calls = logSpy.mock.calls.map((log) => JSON.stringify(log));
    expect(logs.every((log) => calls.includes(log))).toBe(true);
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분하여 출력한다.", async () => {
    // given
    readLineAsync.mockResolvedValue(TEST_CAR_NAMES);
    const app = new App();

    // when
    await app.play();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `pobi, crong, honux가 최종 우승했습니다.`
    );
  });

  test("빈 값을 입력하면 종료한다.", async () => {
    // given
    readLineAsync.mockResolvedValue("");
    const app = new App();

    // when
    await app.play();

    // then
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGES.ERROR_EMPTY_CAR_NAME);
  });
});
