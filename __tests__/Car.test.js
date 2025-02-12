import Car from "../src/models/car";

describe("자동차 클래스 기능 테스트", () => {
  const name = "boky";

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

describe("자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
  const name = "boky";
  const car = new Car(name);

  it("자동차에 이름을 부여할 수 있다.", () => {
    expect(car.name).toEqual(name);
  });

  it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    car.move();
    expect(car.getStatus()).toEqual(`${name} : ${"-".repeat(car.position)}`);
  });
});
