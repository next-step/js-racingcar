import Car from "../src/domain/Car.js";

describe("자동차 구현 테스트", () => {
  test("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("pobi");
    expect(car.name).toBe("pobi");
  });

  test("자동차 이름이 5자 초과인 경우 에러를 발생시킨다.", () => {
    const carNameOver5 = "saemileee";
    expect(() => new Car(carNameOver5)).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );

    const carNameLength6 = "123456";
    expect(() => new Car(carNameLength6)).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });

  test("자동차에 전달 된 숫자가 4이상인 경우에 자동차는 전진한다.", () => {
    const car = new Car("pobi");

    car.move(4);

    expect(car.position).toBe(1);
  });

  test("자동차에 전달 된 숫자가 4미만인 경우에 자동차는 정지한다.", () => {
    const car = new Car("pobi");

    car.move(3);

    expect(car.position).toBe(0);
  });
});
