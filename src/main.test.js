import Car from "./main";

describe("자동차 경주 테스트", () => {
  const CAR_NAME = "toyota";

  it("자동차는 이름을 상태로 가질 수 있다.", () => {
    const car = new Car(CAR_NAME);
    expect(car.getName()).toBe(CAR_NAME);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    const car = new Car(CAR_NAME);
    expect(car.getLocation()).toBe(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car(CAR_NAME);
    car.moveForward();
    expect(car.getLocation()).toBe(1);
    car.moveForward();
    expect(car.getLocation()).toBe(2);
  });
});
