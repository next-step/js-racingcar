import Car from "../../src/car";

describe("Car", () => {
  it("자동차는 이름을 가질 수 있습니다.", () => {
    const car = new Car("다섯글자다");
    expect(car.name).toEqual("다섯글자다");
  });
  it("자동차 이름은 빈 문자열일 수 없습니다", () => {
    expect(() => new Car("")).toThrow();
  });
  it("자동차 이름은 5자를 초과할 수 없습니다.", () => {
    expect(() => new Car("여섯글자이다")).toThrow();
  });
  it("자동차는 위치 값을 가지며 초기 위치는 0입니다.", () => {
    const car = new Car("커트");
    expect(car.position).toEqual(0);
  });
  it("자동차의 위치 값은 음수 값을 가질 수 없습니다.", () => {
    expect(() => new Car("커트", -1)).toThrow();
  });
  it("자동차는 4 이상일 경우에만 전진할 수 있습니다.", () => {
    const car = new Car("레이");
    car.forward(4);
    expect(car.position).toEqual(1);
  });
  it("자동차는 4 미만일 경우에만 전진하지 못합니다.", () => {
    const car = new Car("레이");
    car.forward(3);
    expect(car.position).toEqual(0);
  });
  it("자동차는 음수 값으로 전진할 수 없습니다.", () => {
    const car = new Car("커트");
    expect(() => car.forward(-1)).toThrow();
  });
});
