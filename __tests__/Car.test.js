import Car from "../src/main";

const name = "bokeeeey";

describe("자동차 클래스 기능 테스트", () => {
  it("자동차는 이름을 가진다.", () => {
    const car = new Car(name);

    expect(car.name).toEqual(name);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    const car = new Car(name);

    expect(car.position).toEqual(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car(name);

    car.move();
    const forwardedLocation = car.position;
    expect(forwardedLocation).toEqual(1);
  });
});
