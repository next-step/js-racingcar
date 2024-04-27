import {
  BoundaryRangeError,
  BoundaryTypeError,
  boundaryRandomNumber,
} from "../src/utils/randomNumber";

describe("랜덤 숫자", () => {
  describe("타입이 숫자인지 확인한다.", () => {
    test("숫자가 아닐 경우 에러가 발생한다.", () => {
      // Arrange
      const left = "1";
      const right = "5";

      // Act & Assert
      expect(() => boundaryRandomNumber(left, right)).toThrowError(
        BoundaryTypeError
      );
    });

    test("숫자일 경우 에러가 발생하지 않는다.", () => {
      // Arrange
      const left = 1;
      const right = 5;

      // Act & Assert
      expect(() => boundaryRandomNumber(left, right)).not.toThrowError();
    });
  });

  test("왼쪽 경계값이 오른쪽 경계값보다 크면 에러가 발생한다.", () => {
    // Arrange
    const left = 5;
    const right = 1;

    // Act & Assert
    expect(() => boundaryRandomNumber(left, right)).toThrowError(
      BoundaryRangeError
    );
  });

  test("무작위 수가 왼쪽 경계값 이상 오른쪽 경계값 이하이면 반환한다.", () => {
    // Arrange
    const left = 1;
    const right = 5;

    // Act
    const result = boundaryRandomNumber(left, right);

    // Assert
    expect(result).toBeGreaterThanOrEqual(left);
    expect(result).toBeLessThanOrEqual(right);
  });
});
