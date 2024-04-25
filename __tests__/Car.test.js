import { ERROR_EMPTY_CAR_NAME, ERROR_LONG_CAR_NAME } from "../src/constants";
import { Car } from "../src/domain";

describe("자동차 테스트", () => {
  test("자동차 이름은 5자 이하인 경우 정상", () => {
    // given
    const carName = "Car";

    // when
    const app = () => new Car(carName);

    // then
    expect(app).not.toThrow();
  });

  test("자동차 이름이 5자 초과인 경우 에러", () => {
    // given
    const carName = "LongCar";

    // when
    const app = () => new Car(carName);

    // then
    expect(app).toThrow(ERROR_LONG_CAR_NAME);
  });

  test("자동차 이름이 빈 문자열인 경우 에러", () => {
    // given
    const carName = "";

    // when
    const app = () => new Car(carName);

    // then
    expect(app).toThrow(ERROR_EMPTY_CAR_NAME);
  });
});
