import Car from "../src/Car";

describe("자동차 클래스 테스트", () => {
  it("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("강은비");

    expect(car.name).toBe("강은비");
  });

  it("자동차의 이름은 1자 이상이어야 한다.", () => {
    expect(() => new Car("")).toThrow(Car.VALIDATION_ERROR_MESSAGE);
  });

  it("자동차의 이름은 5자 이하여야 한다.", () => {
    expect(() => new Car("강은비강은비")).toThrow(Car.VALIDATION_ERROR_MESSAGE);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    const car = new Car("강은비");

    expect(car.position).toBe(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car("강은비");

    expect(car.position).toBe(0);

    car.moveForward();

    expect(car.position).toBe(1);
  });
});
