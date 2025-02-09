import Car from "../src/Car.js";

describe("Car 클래스 기능 테스트", () => {
  let car;

  beforeEach(() => {
    car = new Car("na-reum");
  });

  it("자동차는 이름을 가진다", () => {
    expect(car.name).toBe("na-reum");
  });

  it("자동차는 위치 값을 가지며, 초기값은 0이다", () => {
    expect(car.position).toBe(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다", () => {
    const initialPosition = car.position;
    car.moveForward();
    expect(car.position).toBe(initialPosition + 1);
  });
});
