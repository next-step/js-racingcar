import { Car } from "../../src/domain/car.js";

describe("객체 생성", () => {
  it("생성", () => {
    const car = new Car('name');
    expect(car).toEqual(new Car('name'));
  });
});
