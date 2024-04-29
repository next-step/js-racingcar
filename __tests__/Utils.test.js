import readline from "readline";

import {
  ReadLineArgumentError,
  ReadLineTypeError,
  readLineAsync,
} from "../src/utils/readline.js";
import { generateRandomNumber } from "../src/utils/randomNumber.js";

jest.mock("readline");

describe("랜덤 숫자", () => {
  describe("타입이 숫자인지 확인한다.", () => {
    test("숫자가 아닐 경우 에러가 발생한다.", () => {
      // Arrange
      const min = "1";
      const max = "5";

      // Act & Assert
      expect(() => generateRandomNumber(min, max)).toThrowError(TypeError);
    });

    test("숫자일 경우 에러가 발생하지 않는다.", () => {
      // Arrange
      const min = 1;
      const max = 5;

      // Act & Assert
      expect(() => generateRandomNumber(min, max)).not.toThrowError();
    });
  });

  test("왼쪽 경계값이 오른쪽 경계값보다 크면 에러가 발생한다.", () => {
    // Arrange
    const min = 5;
    const max = 1;

    // Act & Assert
    expect(() => generateRandomNumber(min, max)).toThrowError(RangeError);
  });

  test("무작위 수가 왼쪽 경계값 이상 오른쪽 경계값 이하이면 반환한다.", () => {
    // Arrange
    const min = 1;
    const max = 5;

    // Act
    const result = generateRandomNumber(min, max);

    // Assert
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe("입력", () => {
  let mockQuestion;
  let mockRl;

  beforeEach(() => {
    mockQuestion = jest.fn();
    mockRl = { question: mockQuestion, close: jest.fn() };
    readline.createInterface.mockReturnValue(mockRl);
  });

  test("문자열이 아니면 에러가 발생한다.", async () => {
    // Arrange
    const query = 1;

    // Act & Assert
    await expect(readLineAsync(query)).rejects.toThrowError(ReadLineTypeError);
  });

  test("인자가 1개가 아니면 에러가 발생한다.", async () => {
    // Arrange
    const query = "질문";

    // Act & Assert
    await expect(readLineAsync(query, "다른 인자")).rejects.toThrowError(
      ReadLineArgumentError
    );
  });
});
