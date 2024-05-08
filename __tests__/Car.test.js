import { Car } from "../src/domain/car/car.model.js";

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

    test("MOVE_DISTANCE만큼 전진한다.(position이 주어지지 않은 경우)", () => {
      // Arrange
      const car = new Car({ name: initialName, position: initialPosition });

      // Act
      car.move();

      // Assert
      expect(car.position).toBe(initialPosition + moveDistance);
    });

    test("MOVE_DISTANCE만큼 전진한다.(position이 주어진 경우)", () => {
      // Arrange
      const position = 2;
      const car = new Car({ name: initialName, position: position });

      // Act
      car.move();

      // Assert
      expect(car.position).toBe(position + moveDistance);
    });

    test("자동차는 전진하지 않을 수 있다.", () => {
      // Arrange
      const car = new Car({ name: initialName, position: initialPosition });

      // Assert
      expect(car.position).toBe(initialPosition);
    });

    describe("무작위 수가 4 이상인 경우 전진할 수 있다.", () => {
      const movementRule = (randomNumber) => randomNumber >= 4;

      test("무작위수 4 이상인 경우 전진한다.", () => {
        // Arrange
        const car = new Car({ name: initialName, position: initialPosition });
        const randomNumber = 4;

        // Act
        if (movementRule(randomNumber)) {
          car.move();
        }
        expect(car.position).toBe(initialPosition + moveDistance);
      });

      test("무작위수 4 미만인 경우 전진하지 않는다.", () => {
        // Arrange
        const car = new Car({ name: initialName, position: initialPosition });
        const randomNumber = 3;

        // Act
        if (movementRule(randomNumber)) {
          car.move(shouldMove);
        }

        // Assert
        expect(car.position).toBe(initialPosition);
      });
    });
  });
});
