import Car from "../src/Models/Car.js";
import { FixedStrategy } from "../src/Models/MoveStrategy.js";

describe("Car 이름 유효성 검사", () => {
  const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;

  it.each([1031, true, null, undefined, {}, [], function () {}])(
    "문자열 형태가 아니라면 에러를 발생시킵니다.",
    (carName) => {
      expect(() => Car.of(carName)).toThrow(CAR_ERROR_MESSAGE.NOT_STRING_NAME);
    }
  );

  it("빈 값인 경우 에러를 발생시킵니다.", () => {
    expect(() => Car.of("")).toThrow(CAR_ERROR_MESSAGE.EMPTY_NAME);
  });

  it.each(["erica0", "ericaGong", "*****!", "951031"])(
    "5자 초과인 경우 에러를 발생시킵니다.",
    (carName) => {
      expect(() => Car.of(carName)).toThrow(CAR_ERROR_MESSAGE.LONG_NAME);
    }
  );

  it("5자 이하의 유효한 이름인 경우 오류를 발생시키지 않습니다.", () => {
    expect(() => Car.of("erica")).not.toThrow();
  });

  it.each([{ position: 0 }, { position: 1 }])(
    "유효한 이름과 위치가 주어진 경우, 이름과 위치를 상태로 하는 Car 객체를 생성합니다.",
    ({ position }) => {
      const car = Car.of("erica", position);
      expect(car.name).toBe("erica");
      expect(car.position).toBe(position);
    }
  );
});

describe("전진 동작 테스트", () => {
  it.each([4, 9])(
    "랜덤 숫자가 4 이상이면 현재 위치에서 1만큼 전진합니다.",
    (num) => {
      const car = Car.of("erica", 0);
      car.tryMove(new FixedStrategy(num));
      expect(car.position).toBe(1);
    }
  );

  it.each([0, 3])("랜덤 숫자가 4 미만이면 현재 위치를 유지합니다.", (num) => {
    const car = Car.of("erica", 0);
    car.tryMove(new FixedStrategy(num));
    expect(car.position).toBe(0);
  });

  describe("전진 조건이 변경된 경우, 변경된 조건에 따라 이동 여부를 결정합니다.", () => {
    it.each([5, 9])(
      "랜덤 숫자가 5 이상이면 현재 위치에서 1만큼 전진합니다.",
      (num) => {
        const car = Car.of("erica", 0);
        const strategy = new FixedStrategy(num);
        strategy.setMovableCondition((num) => num >= 5);
        car.tryMove(strategy);
        expect(car.position).toBe(1);
      }
    );
    it.each([0, 3, 4])(
      "랜덤 숫자가 5 미만이면 현재 위치를 유지합니다.",
      (num) => {
        const car = Car.of("erica", 0);
        const strategy = new FixedStrategy(num);
        strategy.setMovableCondition((num) => num >= 5);
        car.tryMove(strategy);
        expect(car.position).toBe(0);
      }
    );
  });
});

describe("Car 정보 반환 테스트", () => {
  const car = Car.of("erica", 0);

  it("Car 객체는 이름을 반환합니다.", () => {
    expect(car.name).toBe("erica");
  });

  it("Car 객체는 현재 위치를 반환합니다.", () => {
    expect(car.position).toBe(0);
  });

  it("Car 객체의 정보를 반환하는 객체 타입을 반환합니다.", () => {
    expect(car.getRecord()).toBeInstanceOf(Object);
    expect(car.getRecord()).toHaveProperty("name");
    expect(car.getRecord()).toHaveProperty("position");
  });
});
