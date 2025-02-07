import Car from "../src/Car";

describe("자동차 위치", () => {
  it("자동차는 위치 값을 가지며, 초기 상태는 0입니다", () => {
    const car = new Car("hojeong");

    expect(car.getLocation()).toMatchObject({
      x: 0,
      y: 0,
      z: 0,
    });
  });
});
