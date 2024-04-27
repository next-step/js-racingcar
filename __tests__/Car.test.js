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
});
