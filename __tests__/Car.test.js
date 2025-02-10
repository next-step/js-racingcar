import Car from "../src/main";

const NAME = "boky";

const createCar = () => new Car(NAME);

describe("자동차 클래스 기능 테스트", () => {
  it("자동차는 이름을 가진다.", () => {
    const car = createCar();
    expect(car.name).toEqual(NAME);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    const car = createCar();
    expect(car.position).toEqual(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = createCar();
    car.move();
    const forwardedLocation = car.position;
    expect(forwardedLocation).toEqual(1);
  });
});
