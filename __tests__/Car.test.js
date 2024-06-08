import Car from "../src/domain/Car.js";
import { CAR } from "../src/constants/error";
import { CAR_NAME_MAX_LENGTH } from "../src/constants/number";

describe("자동차 기능 테스트", () => {
  test("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("navy");
    expect(car.name).toBe("navy");
  });

  test("자동차 이름은 5자 이하만 가능하다", () => {
    const car = new Car("navy");
    const name = car.name;
    expect(name.length).toBeLessThanOrEqual(CAR_NAME_MAX_LENGTH);
  });

  test("전진 조건이 4이상이면 1칸 전진", () => {
    const car = new Car("navy");
    car.drive(4);
    expect(car.position).toBe(1);
  });

  describe.each([
    { name: "scarlet", expectedError: CAR.NAME_LENGTH_EXCEED },
    { name: "    ", expectedError: CAR.NAME_EMPTY },
  ])("($name)으로 ", ({ name, expectedError }) => {
    test(`자동차 객체를 생성하면 ${expectedError} 가 발생한다`, () => {
      expect(() => new Car(name)).toThrow(expectedError);
    });
  });
});
