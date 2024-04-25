import {
  ERROR_EMPTY_CAR_NAME,
  ERROR_LONG_CAR_NAME,
  MOVE_FORWARD_CAR,
} from "../src/constants";
import { Car } from "../src/domain";
import { getRandomInRange } from "../src/utils";

jest.mock("../src/utils", () => ({
  getRandomInRange: jest.fn(),
}));

describe("자동차 테스트", () => {
  afterEach(() => {
    getRandomInRange.mockReset();
  });

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

  test("0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진", () => {
    // given
    const car = new Car("Car");
    const position = 1;
    getRandomInRange.mockReturnValue(MOVE_FORWARD_CAR);

    // when
    car.move(getRandomInRange());

    // then
    expect(car.getPosition()).toBe(position);
    expect(getRandomInRange).toHaveBeenCalled();
  });
});
