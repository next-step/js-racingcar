import { ERROR_MESSAGE as CAR_ERROR_MESSAGE } from "../src/domain/car/car.error.js";
import { Car } from "../src/domain/car/car.model.js";
import { ERROR_MESSAGE as RACING_ERROR_MESSAGE } from "../src/domain/racing/racing.error.js";
import { readLineAsync } from "../src/utils/readline.js";
import { View } from "../src/View.js";

jest.mock("../src/utils/readline.js", () => ({
  readLineAsync: jest.fn(),
}));

describe("View", () => {
  let view;
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    view = new View();
    logSpy = jest.spyOn(console, "log").mockImplementation();
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe("자동차 이름 입력", () => {
    test("자동차는 쉼표를 기준으로 구분하여 입력받는다.", async () => {
      const inputtedString = "Tesla, BMW, Audi";
      readLineAsync.mockResolvedValue(inputtedString);

      const carNameList = await view.inputCarNames();

      expect(carNameList).toEqual(["Tesla", "BMW", "Audi"]);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await view.inputCarNames();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy).toHaveBeenCalledWith(CAR_ERROR_MESSAGE.NAME.TOO_LONG);
      expect(errorSpy).toHaveBeenCalledWith(CAR_ERROR_MESSAGE.NAME.REQUIRED);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 다시 입력을 받는다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      const carNameList = await view.inputCarNames();

      expect(carNameList).toStrictEqual(["Tesla"]);
    });
  });

  describe("경주 라운드 입력", () => {
    test("경주의 라운드 수를 입력받는다.", async () => {
      const inputtedString = "5";
      readLineAsync.mockResolvedValue(inputtedString);

      const racingRound = await view.inputRacingRound();

      expect(racingRound).toBe(5);
    });

    test("사용자가 잘못된 경주 라운드를 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["a", "0", "3"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await view.inputRacingRound();

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

      const racingRound = await view.inputRacingRound();

      expect(racingRound).toBe(3);
    });
  });

  test("경주를 완료한 후 우승자를 출력한다.", () => {
    const carName = "Tesla";
    const winnerList = [new Car({ name: carName })];

    view.printWinner(winnerList);

    expect(logSpy).toHaveBeenCalledWith("Tesla가 최종 우승했습니다.");
  });

  test("우승자가 여려명일 경우 쉼표(,) 기준으로 구분하여 출력한다.", () => {
    const carNameList = ["Tesla", "BMW"];
    const winnerList = carNameList.map((name) => new Car({ name: name }));

    view.printWinner(winnerList);

    expect(logSpy).toHaveBeenCalledWith("Tesla, BMW가 최종 우승했습니다.");
  });

  test("전진하는 자동차를 출력할 때 자동차 이름과 위치를 출력한다.", () => {
    const carList = [new Car({ name: "Tesla", position: 3 })];

    view.printCarPosition(carList);

    expect(logSpy).toHaveBeenCalledWith("Tesla: ---");
  });
});
