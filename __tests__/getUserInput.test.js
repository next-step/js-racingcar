import { readLineAsync } from "../src/getUserInput";
jest.mock("readline");

import readline from "readline";

describe("사용자가 입력한 단어를 정상적으로 인식하는지 확인합니다.", () => {
  let mockInterface;

  beforeEach(() => {
    // `readline.createInterface`를 Mock 처리
    mockInterface = {
      question: jest.fn(),
      close: jest.fn(),
    };

    readline.createInterface.mockReturnValue(mockInterface);
  });
  afterEach(() => {
    jest.restoreAllMocks(); // 모든 Mock 초기화
  });

  it("사용자로부터 값을 입력받습니다.", async () => {
    // `question()`이 실행되면 자동으로 "Mocked Input"을 입력하도록 설정
    mockInterface.question.mockImplementation((query, callback) => {
      callback("붕붕");
    });

    const result = await readLineAsync("경주할 자동차 이름을 입력하세요 : ");

    expect(result).toBe("붕붕"); // 입력값이 정상 반환되는지 확인
  });
});
