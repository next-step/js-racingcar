import { ERROR_MESSAGE as CAR_ERROR_MESSAGE } from "../src/domain/car/car.error.js";
import Car from "../src/domain/car/car.model.js";
import CarView from "../src/domain/car/car.view.js";
import readLineAsync from "../src/utils/readLineAsync.js";

jest.mock("../src/utils/readLineAsync.js", () => jest.fn());

describe("Car View", () => {
  let carView;
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    carView = new CarView();
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
      readLineAsync.mockResolvedValueOnce(inputtedString);

      const carNameList = await carView.inputCarNames();

      expect(carNameList).toStrictEqual(["Tesla", "BMW", "Audi"]);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 에러 메시지를 출력한다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      await carView.inputCarNames();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy).toHaveBeenCalledWith(CAR_ERROR_MESSAGE.NAME.TOO_LONG);
      expect(errorSpy).toHaveBeenCalledWith(CAR_ERROR_MESSAGE.NAME.REQUIRED);
    });

    test("사용자가 잘못된 자동차 이름을 입력할 경우 다시 입력을 받는다.", async () => {
      const inputtedString = ["TeslaX, BMW, Audi", "Tesla,", "Tesla"];

      inputtedString.forEach((input) => {
        readLineAsync.mockResolvedValueOnce(input);
      });

      const carNameList = await carView.inputCarNames();

      expect(carNameList).toStrictEqual(["Tesla"]);
    });
  });

  test("전진하는 자동차를 출력할 때 자동차 이름과 위치를 출력한다.", () => {
    const car = new Car({ name: "Tesla", position: 3 });

    carView.printCarPosition(car);

    expect(logSpy).toHaveBeenCalledWith("Tesla: ---");
  });
});
