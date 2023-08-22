import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants.js";
import CarModel from "./CarModel.js";

const DEFAULT_NAME = "크롱";

describe("CarModel", () => {
  describe("이름 설정", () => {
    test("자동차는 이름을 가진다.", () => {
      const car = new CarModel(DEFAULT_NAME);

      expect(car.name).toBe(DEFAULT_NAME);
    });

    test(`자동차의 이름은 ${CONDITIONS.MAX_CAR_NAME_LENGTH}자 이하만 가능하다.`, () => {
      expect(() => new CarModel("크롱크롱크롱")).toThrow(
        ERROR_MESSAGES.OVER_MAXIMUM_CAR_NAME_LENGTH,
      );
    });

    test("자동차의 이름은 공백을 가질 수 없다.", () => {
      expect(() => new CarModel("")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
      expect(() => new CarModel("   ")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
    });
  });
  describe("전진", () => {
    test(`주어진 숫자가 ${CONDITIONS.CAR_MOVE_THRESHOLD} 이상일 경우 전진한다.`, () => {
      const car = new CarModel(DEFAULT_NAME);

      car.go(4);

      expect(car.movement).toBe(1);
    });

    test(`주어진 숫자가 ${CONDITIONS.CAR_MOVE_THRESHOLD} 미만일 경우 전진하지않는다.`, () => {
      const car = new CarModel(DEFAULT_NAME);

      [0, 1, 2, 3].forEach(car.go);

      expect(car.movement).toBe(0);
    });
  });
});
