import { ERROR_EMPTY_CAR_NAME, ERROR_LONG_CAR_NAME } from "../src/constants";
import { Car } from "../src/domain";

describe("자동차 테스트", () => {
  test("자동차 이름은 5자 이하인 경우 정상", () => {
    const carName = "Car";
    expect(() => new Car(carName)).not.toThrow();
  });

  test("자동차 이름이 5자 초과인 경우 에러", () => {
    const carName = "LongCar";
    expect(() => new Car(carName)).toThrow(ERROR_LONG_CAR_NAME);
  });

  test("자동차 이름이 빈 문자열인 경우 에러", () => {
    const carName = "";
    expect(() => new Car(carName)).toThrow(ERROR_EMPTY_CAR_NAME);
  });
});
