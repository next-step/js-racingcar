import start from "../src/main";
import Car from "../src/makeCar";

jest.mock("readline");

import readline from "readline";

describe("자동차 경주 게임이 잘 진행되는지 테스트한다.", () => {
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

  it("사용자가 입력한 값이 차의 이름이 됩니다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대,기아,쌍용");
    });

    const carArr = await start();

    expect(carArr).toEqual([new Car("현대"), new Car("기아"), new Car("쌍용")]);
  });

  it("사용자가 입력한 차의 이름이 5글자를 넘으면 에러가 발생합니다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대기아자동차");
    });

    await expect(start()).rejects.toThrow("차 이름은 5글자 이하만 가능합니다.");
  });
});
