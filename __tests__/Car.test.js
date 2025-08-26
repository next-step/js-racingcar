import { Car } from "../src/domain/Car.js";

describe(Car.name, () => {
  it("자동차는 이름을 상태로 가질 수 있다", () => {
    const carName = "현대차";
    const car = new Car(carName);
    const { name } = car.record;

    expect(name).toBe(carName);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다", () => {
    const car = new Car("킥킥");
    const { xPosition } = car.record;

    expect(xPosition).toBe(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진하다.", () => {
    const car = new Car("소나타");

    const record1 = car.record;
    expect(record1.xPosition).toBe(0);

    car.goForward();

    const record2 = car.record;
    expect(record2.xPosition).toBe(1);
  });
});
