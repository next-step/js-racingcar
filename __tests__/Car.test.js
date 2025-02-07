import Car from "../src/Car.js";

it("자동차는 이름을 가진다", () => {
  const car = new Car("NEXTSTEP");

  expect(car.name).toEqual("NEXTSTEP");
});

it("자동차는 위치 값을 가지며, 초기 값은 0이다.", () => {
  const car = new Car("NEXTSTEP");

  expect(car.location).toEqual(0);
});

it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
  const car = new Car("NEXTSTEP");

  car.moveForward();

  const movedLocation = car.location;

  expect(movedLocation).toEqual(1);
});
