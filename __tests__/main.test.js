import start from "../src/main";

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

  it("이름을 입력하면 자동으로 경주가 시작됩니다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대,기아,쌍용");
    });
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await start();

    expect(consoleSpy).toHaveBeenCalledWith("경주 시작!");
  });
});
