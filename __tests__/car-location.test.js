import Car from "../src/Car.js";

describe("자동차는 위치 값을 가진다", () => {
  let car;
  beforeAll(() => {
    console.log("자동차 위치 테스트 시작");
  });
  beforeEach(() => {
    car = new Car("hojeong3");
  });
  it("초기 상태는 0입니다", () => {
    expect(car.getLocation()).toMatchObject({
      x: 0,
      y: 0,
      z: 0,
    });
  });

  it("위치 상태는 음수가 될 수 없다", () => {
    // https://github.com/next-step/js-racingcar/pull/270#discussion_r1945834268
    expect(car.setLocation).toBeUndefined();
  });

  afterAll(() => {
    console.log("자동차 위치 테스트 끝");
  });
});
