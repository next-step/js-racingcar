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

  test("1칸씩 전진한 흔적('-')이 콘솔창에 남는다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("기아");
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const expectedLogs = [
      "경주 시작!",
      "",
      "기아 : -",
      "",
      "기아 : --",
      "",
      "기아 : ---",
      "",
      "기아 : ----",
      "",
      "기아 : -----",
      "",
    ];
    await start();

    expect(consoleSpy.mock.calls).toEqual(expectedLogs.map((msg) => [msg]));
  });
});
