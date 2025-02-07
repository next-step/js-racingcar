import Car from "../src/Car.js";

describe("자동차는 전진할 수 있다", () => {
  let car;
  beforeAll(() => {
    console.log("자동차 전진 테스트 시작");
  });
  beforeEach(() => {
    car = new Car("hojeong3");
  });

  it("한번에 x축으로, 1만큼 전진한다", () => {
    car.goToX();

    const forwardedLocation = car.getLocation();

    expect(forwardedLocation).toMatchObject({
      x: 1,
      y: 0,
      z: 0,
    });
  });
  it("한번에 y축으로, 1만큼 전진한다", () => {
    car.goToY();
    const forwardedLocation = car.getLocation();

    expect(forwardedLocation).toMatchObject({
      x: 0,
      y: 1,
      z: 0,
    });
  });
  it("한번에 z축으로, 1만큼 전진한다", () => {
    car.goToZ();
    const forwardedLocation = car.getLocation();

    expect(forwardedLocation).toMatchObject({
      x: 0,
      y: 0,
      z: 1,
    });
  });

  afterAll(() => {
    console.log("자동차 전진 테스트 끝");
  });
});
