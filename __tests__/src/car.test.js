import Car from "../../src/car";

describe("Car", () => {
  it("자동차는 이름을 가질 수 있습니다.", () => {
    const car = new Car("커트");
    expect(car.name).toEqual("커트");
  });
});
