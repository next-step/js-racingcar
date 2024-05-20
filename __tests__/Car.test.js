import { ERROR_CODES } from "../src/constants";
import { Car } from "../src/domain";

describe("자동차 테스트", () => {
  test("자동차 이름은 5자 이하인 경우 정상", () => {
    // given
    const carName = "Car";

    // when
    const car = () => new Car(carName);

    // then
    expect(car).not.toThrow();
  });

  test("자동차 이름이 5자 초과인 경우 에러", () => {
    // given
    const carName = "LongCar";

    // when
    const car = () => new Car(carName);

    // then
    expect(car).toThrow(ERROR_CODES.ERROR_LONG_CAR_NAME);
  });

  test("자동차 이름이 빈 문자열인 경우 에러", () => {
    // given
    const carName = "";

    // when
    const car = () => new Car(carName);

    // then
    expect(car).toThrow(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
  });

  test("자동차의 전진조건을 만족하면 전진", () => {
    // given
    const car = new Car("car");

    // when
    car.move(() => true);

    // then
    expect(car.position).toBe(1);
  });

  test("자동차 이름은 문자열이다.", () => {
    // given
    const carName = "12345";

    // when
    const car = () => new Car(carName);

    // then
    expect(car).not.toThrow();
  });

  test("자동차 이름은 문자열이 아니면 에러출력", () => {
    // given
    const carName = 12345;

    // when
    const car = () => new Car(carName);

    // then
    expect(car).toThrow(ERROR_CODES.ERROR_INVALID_CAR_NAME);
  });
});
