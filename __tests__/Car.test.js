import Car from "../src/Car";

describe("자동차", () => {
  test("자동차는 이름을 상태로 가질 수 있다.", () => {
    const car = new Car("자동차");

    expect(car.name).toBe("자동차");
  });

  test("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    const car = new Car("자동차");

    expect(car.location).toBe(0);
  });

  test("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car("자동차");

    car.move();
    expect(car.location).toBe(1);
  });
});
