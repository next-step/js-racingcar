import Car from "../src/domain/Car";

describe("자동차 기능 테스트", () => {
  test("자동차의 이름은 5자 이하", () => {
    // given
    const CAR_NAME = "ganu";
    const car = new Car(CAR_NAME);

    // when
    const name = car.name;

    // then
    expect(name.length).toBeLessThanOrEqual(5);
  });

  test("무작위 값이 4 이상일 경우 전진", () => {
    // given
    const CAR_NAME = "ganbu";
    const car = new Car(CAR_NAME);
    const RANDOM_VALUE = 5;

    // when
    if (Car.shouldCarMove(RANDOM_VALUE)) {
      car.move();
    }

    // then
    expect(car.position).toBe(1);
  });

  test("무작위 값이 4 미만일 경우 정지", () => {
    // given
    const CAR_NAME = "ganbu";
    const car = new Car(CAR_NAME);
    const RANDOM_VALUE = 2;

    // when
    if (Car.shouldCarMove(RANDOM_VALUE)) {
      car.move();
    }

    // then
    expect(car.position).toBe(0);
  });
});
