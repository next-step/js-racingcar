import Car from "../src/Car";

describe("자동차 이름", () => {
  it("자동차는 전진할 수 있으며, 한번에 1만큼 전진한다", () => {
    const car = new Car("hojeong3");

    car.goToX();

    const forwardedLocation = car.getLocation();

    expect(forwardedLocation).toMatchObject({
      x: 1,
      y: 0,
      z: 0,
    });
  });
});
