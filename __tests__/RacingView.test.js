import Car from "../src/domain/car/car.model.js";
import { ERROR_MESSAGE as RACING_ERROR_MESSAGE } from "../src/domain/racing/racing.error.js";
import RacingView from "../src/domain/racing/racing.view.js";
import readLineAsync from "../src/utils/readLineAsync.js";

jest.mock("../src/utils/readLineAsync.js", () => jest.fn());

describe("Racing View", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  const racingView = new RacingView();

  describe("경주 라운드 입력", () => {
    test("경주의 라운드 수를 입력받는다.", async () => {
      const inputtedString = "5";
      readLineAsync.mockResolvedValue(inputtedString);

      const racingRound = await racingView.inputRacingRound();

      expect(racingRound).toBe(5);
    });

    test("사용자가 잘못된 경주 라운드를 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["a", "0", "3"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await racingView.inputRacingRound();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy).toHaveBeenCalledWith(
        RACING_ERROR_MESSAGE.ROUND.INVALID_TYPE,
      );
      expect(errorSpy).toHaveBeenCalledWith(
        RACING_ERROR_MESSAGE.ROUND.INVALID_RANGE,
      );
    });

    test("사용자가 잘못된 경주 라운드를 입력할 경우 다시 입력을 받는다.", async () => {
      const inputtedString = ["a", "0", "3"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      const racingRound = await racingView.inputRacingRound();

      expect(racingRound).toBe(3);
    });
  });

  test("경주를 완료한 후 우승자를 출력한다.", () => {
    const carName = "Tesla";
    const winnerList = [new Car({ name: carName })];

    racingView.printWinners(winnerList);

    expect(logSpy).toHaveBeenCalledWith("Tesla가 최종 우승했습니다.");
  });

  test("우승자가 여려명일 경우 쉼표(,) 기준으로 구분하여 출력한다.", () => {
    const carNameList = ["Tesla", "BMW"];
    const winnerList = carNameList.map((name) => new Car({ name: name }));

    racingView.printWinners(winnerList);

    expect(logSpy).toHaveBeenCalledWith("Tesla, BMW가 최종 우승했습니다.");
  });
});
