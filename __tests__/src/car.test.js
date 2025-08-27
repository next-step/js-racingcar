import Car from "../../src/car";

describe("Car", () => {
  it("자동차는 이름을 가질 수 있습니다.", () => {
    const car = new Car("커트");
    expect(car.name).toEqual("커트");
  });
  it("자동차 이름은 빈 문자열일 수 없습니다", () => {
    expect(() => new Car("")).toThrow();
  });
  it("자동차는 위치 값을 가지며 초기 위치는 0입니다.", () => {
    const car = new Car("커트");
    expect(car.position).toEqual(0);
  });
  it("자동차는 한 번에 1만큼 전진합니다.", () => {
    const car = new Car("커트");
    car.forward();
    expect(car.position).toEqual(1);
  });
  it("자동차는 음수 값으로 전진할 수 없습니다.", () => {
    const car = new Car("커트");
    expect(() => car.forward(-1)).toThrow();
  });
});
