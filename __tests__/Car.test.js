import { Car } from "../src/Car";

describe(Car.name, () => {
  it("자동차는 이름을 상태로 가질 수 있다", () => {
    const car = new Car("씽씽붕붕이");
    const carInfo = car.getCarInfo();

    expect(carInfo.name).toBe("씽씽붕붕이");
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다", () => {
    const car = new Car("킥킥");
    const carInfo = car.getCarInfo();

    expect(carInfo.xPosition).toBe(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진하다.", () => {
    const car = new Car("소나타");
    const carInfo = car.getCarInfo();

    expect(carInfo.xPosition).toBe(0);

    car.goForward();

    expect(carInfo.xPosition).toBe(1);
  });
});
