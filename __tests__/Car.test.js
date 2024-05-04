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

  test("자동차 이름이 5자 이상이면 에러를 던진다", () => {
    expect(() => new Car("scarlet")).toThrow(CAR.NAME_LENGTH_EXCEED);
  });

  // test("자동차 이름이 빈값일 경우, 에러를 던진다", () => {
  //   expect(() => new Car("    ")).toThrow(CAR.NAME_EMPTY);
  // });

  test("전진 조건이 4이상이면 1칸 전진", () => {
    const car = new Car("navy");
    car.drive(4);
    expect(car.position).toBe(1);
  });
});
