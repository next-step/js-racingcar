import Car from "../../src/car.js";
import { Racing } from "../../src/racing.js";

describe("racing", () => {
  it("자동차 경주는 1회 이상이어야 합니다.", () => {
    expect(
      () => new Racing({ carList: [new Car("아반떼")], phase: 0 })
    ).toThrow();
  });
});
