import Car from "../src/Car";

describe("자동차 기능 테스트", () => {
  let car;

  beforeEach(() => {
    car = new Car("myCar");
  });

  test("자동차는 myCar라는 이름을 가진다", () => {
    expect(car.name).toEqual("myCar");
  });

  test("자동차는 초기 상태로 위치 값을 0을 가진다", () => {
    expect(car.position).toEqual(0);
  });

  test("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    car.move();
    expect(car.position).toEqual(1);
  });
});
