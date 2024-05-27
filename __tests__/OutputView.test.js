import Car from "../src/domain/car/car.model";
import OutputView from "../src/view/output";

describe("Output View", () => {
  let logSpy;
  const outputView = new OutputView();

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("전진하는 자동차를 출력할 때 자동차 이름과 위치를 출력한다.", () => {
    const car = new Car({ name: "Tesla", position: 3 });

    outputView.printCarPosition(car);

    expect(logSpy).toHaveBeenCalledWith("Tesla: ---");
  });

  test("경주를 완료한 후 우승자를 출력한다.", () => {
    const carName = "Tesla";
    const winners = [new Car({ name: carName })];

    outputView.printWinners(winners);

    expect(logSpy).toHaveBeenCalledWith("Tesla가 최종 우승했습니다.");
  });

  test("우승자가 여려명일 경우 쉼표(,) 기준으로 구분하여 출력한다.", () => {
    const carNames = ["Tesla", "BMW"];
    const winners = carNames.map((name) => new Car({ name: name }));

    outputView.printWinners(winners);

    expect(logSpy).toHaveBeenCalledWith("Tesla, BMW가 최종 우승했습니다.");
  });
});
