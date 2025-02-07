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
      callback("기아");
    });
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await start();

    expect(consoleSpy).toHaveBeenCalledWith("경주 시작!");
  });

  it("1칸씩 전진한 흔적(" - ")이 콘솔창에 남는다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("기아");
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await start();

    expect(consoleSpy).toHaveBeenNthCalledWith(1, "경주 시작!");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "기아 : -");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "기아 : --");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "기아 : ---");
    expect(consoleSpy).toHaveBeenNthCalledWith(5, "기아 : ----");
    expect(consoleSpy).toHaveBeenNthCalledWith(6, "기아 : -----");
  });
});
