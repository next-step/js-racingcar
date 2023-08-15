import Car from "../src";

const CAR_NAME = "hello";

describe("자동차  경주 게임", () => {
  describe("자동차", () => {
    test("자동차 이름을 가질 수 있다", () => {
      expect(new Car(CAR_NAME).getName()).toBe(CAR_NAME);
    });
    test("자동차는 전진할 수 있다", () => {
      const car = new Car(CAR_NAME);
      car.run(4);
      expect(car.getPosition()).toBe(1);
    });
  });
});
