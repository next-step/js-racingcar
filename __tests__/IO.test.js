import { App } from "../src";
import {
  ERROR_DUPLICATE_CAR_NAME,
  ERROR_INVALID_CAR_NAME,
} from "../src/constants";
import { readLineAsync } from "../src/utils";

const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
  getRandomInRange: jest.fn(),
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
    await readLineAsync.mockResolvedValue(TEST_CAR_NAMES);
    const app = new App();

    // when
    await app.play();

    // then
    const cars = TEST_CAR_NAMES.split(",");
    expect(app.getCars().length).toBe(cars.length);
    cars.forEach((car) => {
      expect(logSpy).toHaveBeenCalledWith(`${car.trim()} : `);
    });
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분하여 출력한다.", async () => {
    // given
    await readLineAsync.mockResolvedValue(TEST_CAR_NAMES);
    const app = new App();

    // when
    await app.play();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `${app
        .getWinners()
        .map((car) => car.getName())
        .join(", ")}가 최종 우승했습니다.`
    );
  });

  test("자동차이름이 빈 값이면 프로그램을 종료한다.", async () => {
    // given
    readLineAsync.mockResolvedValue(",crong,honux");
    const app = new App();

    // when + then
    await expect(app.play()).rejects.toThrow(ERROR_INVALID_CAR_NAME);
  });

  test("자동차이름이 중복된 값이면 프로그램을 종료한다.", async () => {
    // given
    readLineAsync.mockResolvedValue("crong,crong,honux");
    const app = new App();

    // when + then
    await expect(app.play()).rejects.toThrow(ERROR_DUPLICATE_CAR_NAME);
  });
});
