import Car from "../src/Models/Car.js";
import { FixedStrategy } from "../src/Models/MoveStrategy.js";

describe("Car는 이름의 유효성을 확인하고, 유효할 경우만 Car 객체를 생성한다.", () => {
  const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;

  it("Car 이름이 빈 값이면 에러를 발생시킨다.", () => {
    expect(() => Car.of("")).toThrow(CAR_ERROR_MESSAGE.EMPTY_NAME);
  });

  it.each([1031, true, null, undefined, {}, [], function () {}])(
    "Car 이름이 문자열 형태가 아니라면 에러를 발생시킨다.",
    (carName) => {
      expect(() => Car.of(carName)).toThrow(CAR_ERROR_MESSAGE.NOT_STRING_NAME);
    }
  );

  it.each(["erica0", "ericaGong", "*****!", "951031"])(
    "Car 이름이 5자 초과라면 에러를 발생시킨다.",
    (carName) => {
      expect(() => Car.of(carName)).toThrow(CAR_ERROR_MESSAGE.LONG_NAME);
    }
  );

  it("5자 이하의 유효한 Car 이름이라면, 오류를 발생시키지 않는다.", () => {
    expect(() => Car.of("erica")).not.toThrow();
  });

  it.each([{ position: 0 }, { position: 1 }])(
    "유효한 Car 이름과 위치가 주어지면, 이름과 위치를 상태로 갖는 Car 객체를 생성한다.",
    ({ position }) => {
      const car = Car.of("erica", position);

      expect(car.name).toBe("erica");
      expect(car.position).toBe(position);
    }
  );
});

describe(`Car는 전진 조건에 부합하면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
  describe(`자동차는 랜덤 숫자가 4 이상이면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
    it.each([4, 9])(
      `숫자가 4 이상이면 현재 위치에서 1만큼 이동한다.`,
      (num) => {
        const car = Car.of("erica", 0);
        car.tryMove(new FixedStrategy(num));
        expect(car.position).toBe(1);
      }
    );
    it.each([0, 3])(`숫자가 4 미만이면 현재 위치를 유지한다.`, (num) => {
      const car = Car.of("erica", 0);
      car.tryMove(new FixedStrategy(num));
      expect(car.position).toBe(0);
    });
  });

  describe(`자동차는 전진 조건 변경 시, 변경 조건에 따라 이동 여부를 결정한다.`, () => {
    it.each([5, 9])(
      `숫자가 5 이상이면 현재 위치에서 1만큼 이동한다.`,
      (num) => {
        const car = Car.of("erica", 0);
        const strategy = new FixedStrategy(num);
        strategy.setMovableCriteria(5);
        car.tryMove(strategy);
        expect(car.position).toBe(1);
      }
    );
    it.each([0, 3, 4])(`숫자가 5 미만이면 현재 위치를 유지한다.`, (num) => {
      const car = Car.of("erica", 0);
      const strategy = new FixedStrategy(num);
      strategy.setMovableCriteria(5);
      car.tryMove(strategy);
      expect(car.position).toBe(0);
    });
  });
});

describe("Car는 이름과 현재 위치 정보를 반환한다.", () => {
  const car = Car.of("erica", 0);

  it("Car 객체는 이름을 반환한다.", () => {
    expect(car.name).toBe("erica");
  });

  it("Car 객체는 현재 위치를 반환한다.", () => {
    expect(car.position).toBe(0);
  });

  it("Car 객체는 이름과 현재 이름을 객체 형태로 반환한다.", () => {
    expect(car.getRecord()).toBeInstanceOf(Object);
    expect(car.getRecord()).toHaveProperty("name");
    expect(car.getRecord()).toHaveProperty("position");
  });
});
