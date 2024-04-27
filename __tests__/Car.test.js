import { CarModel, CarErrors } from "../src/car";

describe("자동차", () => {
  describe("이름은 5자 이하로 구성되어야 한다.", () => {
    test("이름은 5자 이하로 구성되어 있다.", () => {
      // Arrange
      const carName = "Tesla";

      // Act
      const car = new CarModel.Car({ name: carName });

      // Act & Assert
      expect(car).toBeTruthy();
    });

    test("이름이 주어지지 않으면 에러가 발생한다.", () => {
      // Arrange
      const carName = undefined;

      // Act & Assert
      expect(() => new CarModel.Car({ name: carName })).toThrowError(
        CarErrors.CarNameRequiredError
      );
    });

    test("이름이 공란이면 에러가 발생한다.", () => {
      // Arrange
      const carName = "";

      // Act & Assert
      expect(() => new CarModel.Car({ name: carName })).toThrowError(
        CarErrors.CarNameRequiredError
      );
    });

    test("이름이 5자를 초과하면 에러가 발생한다.", () => {
      // Arrange
      const carName = "TeslaModelS";

      // Act & Assert
      expect(() => new CarModel.Car({ name: carName })).toThrowError(
        CarErrors.CarNameTooLongError
      );
    });
  });

  describe("자동차가 전진하는지 확인한다.", () => {
    let car;

    beforeEach(() => {
      // Arrange
      const carName = "Tesla";
      car = new CarModel.Car({ name: carName });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("무작위 수가 4 이상이면 전진한다.", () => {
      // Arrange
      jest.spyOn(Math, "random").mockReturnValue(0.4);

      // Act
      car.move();

      // Assert
      expect(car.position).toBe(1);
    });

    test("무작위 수가 3 이하이면 전진하지 않는다.", () => {
      // Arrange
      jest.spyOn(Math, "random").mockReturnValue(0.3);

      // Act
      car.move();

      // Assert
      expect(car.position).toBe(0);
    });
  });
});
