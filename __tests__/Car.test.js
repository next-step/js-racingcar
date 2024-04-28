import { MAX_CAR_NAME_LENGTH } from "../src/constants/car";
import { ERROR_CAR_NAME_TOO_LONG } from "../src/constants/error";
import Car from "../src/domain/Car";

describe("자동차 기능 테스트", () => {
  test("자동차 이름이 입력되었을 때 자동차 이름이 5글자 이하이면 해당 이름을 가진 자동차가 정상적으로 생성된다.", () => {
    // given
    const CAR_NAME = "ganu";
    const car = new Car(CAR_NAME);

    // when
    const name = car.name;

    // then
    expect(name.length).toBeLessThanOrEqual(MAX_CAR_NAME_LENGTH);
  });

  test("자동차 이름이 입력되었을 때 자동차 이름이 5글자 초과이면 자동차 생성에 실패한다.", () => {
    // given
    const CAR_NAME = "gan878u";

    // when
    const createCar = () => {
      const car = new Car(CAR_NAME);
    };

    // then
    expect(createCar).toThrow(ERROR_CAR_NAME_TOO_LONG);
  });

  test("자동차가 전진하기 위한 조건에서 무작위 값이 4 이상일 경우 해당 자동차는 1만큼 전진한다.", () => {
    // given
    const CAR_NAME = "ganbu";
    const RANDOM_VALUE = 5;
    const moveCondition = () => RANDOM_VALUE >= 4;
    const car = new Car(CAR_NAME, moveCondition);

    // when
    car.move();

    // then
    expect(car.position).toBe(1);
  });

  test("자동차가 전진하기 위한 조건에서 생성된 무작위 값이 4 미만일 경우 해당 자동차는 정지한다", () => {
    // given
    const CAR_NAME = "ganbu";
    const RANDOM_VALUE = 2;
    const moveCondition = () => RANDOM_VALUE >= 4;
    const car = new Car(CAR_NAME, moveCondition);

    // when
    car.move();

    // then
    expect(car.position).toBe(0);
  });
});
