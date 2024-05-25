import readLineAsync from "../src/utils/readLineAsync.js";
import InputView from "../src/view/input.js";

jest.mock("../src/utils/readLineAsync.js", () => jest.fn());

describe("Input View", () => {
  let inputView;
  let errorSpy;

  beforeEach(() => {
    inputView = new InputView();
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe("자동차 이름 입력", () => {
    test("자동차는 쉼표를 기준으로 구분하여 입력받는다.", async () => {
      const inputtedString = "Tesla, BMW, Audi";
      readLineAsync.mockResolvedValueOnce(inputtedString);

      const carNames = await inputView.inputCarNames();

      expect(carNames).toStrictEqual(["Tesla", "BMW", "Audi"]);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await inputView.inputCarNames();

      expect(errorSpy).toHaveBeenCalledTimes(2);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 다시 입력을 받는다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      const carNames = await inputView.inputCarNames();

      expect(carNames).toStrictEqual(["Tesla"]);
    });
  });

  describe("경주 라운드 입력", () => {
    test("경주의 라운드 수를 입력받는다.", async () => {
      const inputtedString = "5";
      readLineAsync.mockResolvedValue(inputtedString);

      const racingRound = await inputView.inputTotalRounds();

      expect(racingRound).toBe(5);
    });

    test("사용자가 잘못된 경주 라운드를 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["a", "0", "3"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await inputView.inputTotalRounds();

      expect(errorSpy).toHaveBeenCalledTimes(2);
    });

    test("사용자가 잘못된 경주 라운드를 입력할 경우 다시 입력을 받는다.", async () => {
      const inputtedString = ["a", "0", "3"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      const racingRound = await inputView.inputTotalRounds();

      expect(racingRound).toBe(3);
    });
  });
});
