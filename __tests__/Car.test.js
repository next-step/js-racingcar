import Car from "../src/domain/Car.js";

describe("자동차 구현 테스트", () => {
  test("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("pobi");
    expect(car.name).toBe("pobi");
  });
});
