import Car from "../src/Car";

it("자동차는 이름을 가진다.", () => {
  const car = new Car("hojeong12");

  expect(car.getName()).toEqual("hojeong12");
});

it("자동차는 위치 값을 가지며, 초기 상태는 0입니다", () => {
  const car = new Car("hojeong");

  expect(car.getLocation()).toMatchObject({
    x: 0,
    y: 0,
    z: 0,
  });
});

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
