import Car, { makeCar } from "../src/car";
import { getRaceCount } from "../src/getUserInput.js";
import { race } from "../src/race.js";

jest.mock("readline");

import readline from "readline";

describe("잘못된 값을 입력했을때 프로그램이 종료되는지 확인한다.", () => {
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

  test("사용자가 입력한 차의 이름이 5글자를 넘을때 에러가 발생한한다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대기아자동차");
    });

    await expect(makeCar()).rejects.toThrow(
      "차 이름은 5글자 이하만 가능합니다."
    );

    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대자동차");
    });

    await expect(makeCar()).resolves.toBeDefined();
  });

  test("사용자가 숫자 이외의 값을 입력했을때 에러가 발생한한다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("가나다");
    });

    await expect(getRaceCount()).rejects.toThrow(
      "횟수는 숫자만 입력가능합니다."
    );

    mockInterface.question.mockImplementation((query, callback) => {
      callback("5");
    });

    await expect(getRaceCount()).resolves.toBeDefined();
  });
});
