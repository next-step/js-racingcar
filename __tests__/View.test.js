import { View } from "../src/View.js";
import { Car } from "../src/domain/car/car.model.js";

import { readLineAsync } from "../src/utils/readline.js";

jest.mock("../src/utils/readline.js", () => ({
  readLineAsync: jest.fn(),
}));

describe("View", () => {
  let view;
  let logSpy;

  beforeEach(() => {
    view = new View();
    logSpy = jest.spyOn(console, "log").mockImplementation();
  });

  test("자동차는 쉼표를 기준으로 구분하여 입력받는다.", async () => {
    const inputtedString = "Tesla, BMW, Audi";
    readLineAsync.mockResolvedValue(inputtedString);

    const carNameList = await view.inputCarNames();

    expect(carNameList).toEqual(["Tesla", "BMW", "Audi"]);
  });

  test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", async () => {
    readLineAsync.mockResolvedValue(undefined);

    expect(view.inputCarNames()).rejects.toThrowError(Error);
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
