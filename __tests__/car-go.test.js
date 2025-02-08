import Car from "../src/Car.js";

describe("자동차는 전진할 수 있다", () => {
  beforeAll(() => {
    console.log("자동차 전진 테스트 시작");
  });

  it("한번에 x축으로, 1만큼 전진한다", () => {
    // given
    const name = "hojeong";
    const location = {
      x: 0,
      y: 0,
      z: 0,
    };
    const expectedCarLocation = {
      x: 1,
      y: 0,
      z: 0,
    };

    // when
    const car = new Car(name, location);
    car.goToX();
    const actualLocation = car.getLocation();

    // then
    expect(expectedCarLocation).toMatchObject(actualLocation);
  });
  it("한번에 y축으로, 1만큼 전진한다", () => {
    // given
    const name = "hojeong";
    const location = {
      x: 0,
      y: 0,
      z: 0,
    };
    const expectedCarLocation = {
      x: 0,
      y: 1,
      z: 0,
    };

    // when
    const car = new Car(name, location);
    car.goToY();
    const actualLocation = car.getLocation();

    // then
    expect(expectedCarLocation).toMatchObject(actualLocation);
  });
  it("한번에 z축으로, 1만큼 전진한다", () => {
    const name = "hojeong";
    const location = {
      x: 0,
      y: 0,
      z: 0,
    };
    const expectedCarLocation = {
      x: 0,
      y: 0,
      z: 1,
    };

    const car = new Car(name, location);

    car.goToZ();
    const actualLocation = car.getLocation();

    expect(expectedCarLocation).toMatchObject(actualLocation);
  });

  afterAll(() => {
    console.log("자동차 전진 테스트 끝");
  });
});
