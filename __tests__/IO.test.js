import { App } from "../src";

const TEST_CAR_NAMES = "pobi,crong,honux";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn().mockResolvedValue(TEST_CAR_NAMES),
  getRandomInRange: jest.fn(),
}));

describe("입/출력 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("자동차를 출력할 때 쉼표(,)를 기준으로 구분하며 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async () => {
    // given
    const app = new App();

    // when
    await app.play();

    // then
    const cars = TEST_CAR_NAMES.split(",");
    expect(app.cars.length).toBe(cars.length);
    cars.forEach((car) => {
      expect(logSpy).toHaveBeenCalledWith(`${car.trim()} : `);
    });
  });
});
