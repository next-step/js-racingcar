import { findFarthestCar, tryDriveCar, drive } from "../src/race";
import Car from "../src/car";

jest.mock("readline");

import readline from "readline";

describe("사용자가 입력한 차들이 레이싱을 할때", () => {
  let firstCar;
  let secondCar;
  let thirdCar;

  beforeEach(() => {
    firstCar = new Car("일번차");
    secondCar = new Car("이번차");
    thirdCar = new Car("삼번차");
  });

  test("가장 멀리간 차를 찾는다", () => {
    firstCar.go();
    firstCar.go();
    firstCar.go();

    secondCar.go();
    secondCar.go();

    thirdCar.go();

    expect(findFarthestCar([firstCar, secondCar, thirdCar])).toBe("일번차");
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
    firstCar.go();
    firstCar.go();

    secondCar.go();
    secondCar.go();

    thirdCar.go();

    expect(findFarthestCar([firstCar, secondCar, thirdCar])).toBe(
      "일번차,이번차"
    );
  });

  test("차들이 전달 받은 값이 4 이상일때만 전진한다.", () => {
    const originalRandom = Math.random;

    Math.random = jest.fn().mockReturnValue(0.5);
    tryDriveCar(firstCar);
    expect(firstCar.state).toBe(1);

    Math.random = jest.fn().mockReturnValue(0.3);
    tryDriveCar(secondCar);
    expect(secondCar.state).toBe(0);

    Math.random = originalRandom;
  });
});

describe("자동차 경주가 진행 될 때", () => {
  let mockInterface;

  beforeEach(() => {
    mockInterface = {
      question: jest.fn(),
      close: jest.fn(),
    };

    readline.createInterface.mockReturnValue(mockInterface);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("레이싱 진행 상황이 콘솔에 표시된다.", async () => {
    Math.random = jest.fn().mockReturnValue(0.5);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    drive([new Car("기아")]);

    const expectedLogs = ["기아 : -", ""];

    expect(consoleSpy.mock.calls).toEqual(expectedLogs.map((msg) => [msg]));
  });
});
