import { Car } from "../src/domain/car/car.model.js";
import { generateRandomNumber } from "../src/utils/randomNumber.js";

jest.mock("../src/utils/randomNumber.js", () => ({
  generateRandomNumber: jest.fn(),
}));

describe("자동차", () => {
  describe("이름은 5자 이하로 구성되어야 한다.", () => {
    test("이름은 5자 이하로 구성되어 있다.", () => {
      // Arrange
      const carName = "Tesla";

      // Act
      const car = new Car({ name: carName });

      // Act & Assert
      expect(car).toBeTruthy();
    });

    test("이름이 주어지지 않으면 에러가 발생한다.", () => {
      // Arrange
      const carName = undefined;

      // Act & Assert
      expect(() => new Car({ name: carName })).toThrowError(TypeError);
    });

    test("이름이 공란이면 에러가 발생한다.", () => {
      // Arrange
      const carName = "";

      // Act & Assert
      expect(() => new Car({ name: carName })).toThrowError(RangeError);
    });

    test("이름이 6자인 경우 에러가 발생한다.", () => {
      // Arrange
      const carName = "TeslaX";

      // Act & Assert
      expect(() => new Car({ name: carName })).toThrowError(RangeError);
    });
  });

  describe("자동차 위치를 설정할 수 있어야 한다.", () => {
    const carName = "Tesla";

    test("자동차의 위치는 number 타입이어야 한다.", () => {
      // Arrange
      const carPosition = "3";

      // Act & Assert
      expect(
        () => new Car({ name: carName, position: carPosition })
      ).toThrowError(TypeError);
    });

    test("자동차의 default 위치는 0으로 설정된다.", () => {
      // Arrange
      const car = new Car({ name: carName });

      // Act & Assert
      expect(car.position).toBe(0);
    });

    test("자동차의 위치가 주어지면 해당 위치로 설정된다.", () => {
      // Arrange
      const carPosition = 3;
      const car = new Car({ name: carName, position: carPosition });

      // Act & Assert
      expect(car.position).toBe(carPosition);
    });
  });

  describe("자동차가 전진하는지 확인한다.", () => {
    const initialName = "Tesla";
    const initialPosition = 0;
    const moveDistance = 1;

    test("shouldMove가 boolean 타입이 아닌 경우 에러가 발생한다.", () => {
      // Arrange
      const car = new Car({ name: initialName, position: initialPosition });

      // Act & Assert
      expect(() => car.move("true")).toThrowError(TypeError);
    });
    test("shouldMove가 true인 경우 MOVE_DISTANCE만큼 전진한다.(position이 주어지지 않은 경우)", () => {
      // Arrange
      const car = new Car({ name: initialName, position: initialPosition });

      // Act
      car.move(true);

      // Assert
      expect(car.position).toBe(initialPosition + moveDistance);
    });

    test("shouldMove가 true인 경우 MOVE_DISTANCE만큼 전진한다.(position이 주어진 경우)", () => {
      // Arrange
      const position = 2;
      const car = new Car({ name: initialName, position: position });

      // Act
      car.move(true);

      // Assert
      expect(car.position).toBe(position + moveDistance);
    });

    test("shouldMove가 false인 경우 전진하지 않는다.", () => {
      // Arrange
      const car = new Car({ name: initialName, position: initialPosition });

      // Act
      car.move(false);

      // Assert
      expect(car.position).toBe(initialPosition);
    });
    describe("무작위 수가 4 이상인 경우 전진할 수 있다.", () => {
      test("무작위수 4 이상인 경우 전진한다.", () => {
        // Arrange
        const car = new Car({ name: initialName, position: initialPosition });
        generateRandomNumber.mockReturnValue(4);

        const randomNumber = generateRandomNumber();
        const shouldMove = randomNumber >= 4;

        // Act
        car.move(shouldMove);
        expect(car.position).toBe(initialPosition + moveDistance);
      });

      test("무작위수 4 미만인 경우 전진하지 않는다.", () => {
        // Arrange
        const car = new Car({ name: initialName, position: initialPosition });
        generateRandomNumber.mockReturnValue(3);

        const randomNumber = generateRandomNumber();
        const shouldMove = randomNumber >= 4;

        // Act
        car.move(shouldMove);

        // Assert
        expect(car.position).toBe(initialPosition);
      });
    });
  });
});
