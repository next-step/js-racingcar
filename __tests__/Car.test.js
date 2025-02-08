import Car from "../src/Car.js";

describe("단위 테스트", () => {
  let car;

  beforeEach(() => {
    car = new Car(); // 각 테스트 전에 car을 초기화
  });

  /*
  자동차는 이름을 상태로 가질 수 있다.
  자동차는 위치 값을 가지며, 초기 상태는 0이다.
  자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.
  */

  it("자동차의 이름 초기값은 빈 문자열이다", () => {
    expect(car.getName()).toEqual("");
  });

  it("자동차는 이름을 바꿀 수 있다", () => {
    car.changeName("NEXTSTEP");
    expect(car.getName()).toEqual("NEXTSTEP");
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다", () => {
    expect(car.getCurrentPosition()).toEqual(0);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다", () => {
    car.move();
    expect(car.getCurrentPosition()).toEqual(1);
  });
});
