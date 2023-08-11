import Car from "../src/Models/Car.js";
import Game from "../src/Models/Game.js";

const CAR_MOVE_CRITERIA = Game.CAR_MOVE_CRITERIA;
const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;

describe("[feature1] 자동차는 이름의 유효성을 확인하고, 유효할 경우만 자동차 객체를 생성한다.", () => {
  it("자동차 이름이 빈 값이면 에러를 발생시킨다.", () => {
    expect(() => new Car("")).toThrow(CAR_ERROR_MESSAGE.EMPTY_NAME);
  });

  it("자동차 이름이 5자 초과면 에러를 발생시킨다.", () => {
    expect(() => new Car("ericagong")).toThrow(CAR_ERROR_MESSAGE.LONG_NAME);
  });

  it("5자 이하의 유효한 자동차 이름이라면 오류를 발생시키지 않는다.", () => {
    expect(() => new Car("erica")).not.toThrow();
  });

  it("유효한 자동차 이름이라면, 자동차 객체를 생성하고 이름과 현재 위치를 상태값으로 갖는다.", () => {
    const car = new Car("erica");

    expect(car.name).toBe("erica");
    expect(car.position).toBe(0);
  });
});

describe(`[feature2] 자동차는 전진조건에 부합하면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
  let testCases = [];

  for (let i = 0; i < 9; i++) {
    testCases.push({
      input: i,
      isMovable: Game.isMovable(i),
    });
  }
  const movableTestCases = testCases.filter(({ isMovable }) => isMovable);
  const immovableTestCases = testCases.filter(({ isMovable }) => !isMovable);
  it.each(immovableTestCases)(
    `자동차는 전진 조건에 부합하지 않으면 현재 위치를 유지한다. (input = $input)`,
    ({ input }) => {
      const car = new Car("erica");
      car.tryMoveWith(input);
      expect(car.position).toBe(0);
    }
  );
  it.each(movableTestCases)(
    `자동차는 전진 조건에 부합하면, 전진한다. (input = $input)`,
    ({ input }) => {
      const car = new Car("erica", 0);
      car.tryMoveWith(input);
      expect(car.position).toBe(1);
    }
  );
});

describe("[feature3] 자동차의 현재 상황 정보를 반환한다.", () => {
  const testCases = [
    { name: "현재 위치를 유지하는 경우", input: CAR_MOVE_CRITERIA - 1 },
    {
      name: `현재 위치에서 1 만큼 전진하는 경우`,
      input: CAR_MOVE_CRITERIA,
    },
  ];

  it.each(testCases)(
    "자동차가 $name 경우, 자동차의 이름을 반환한다.",
    ({ input }) => {
      const car = new Car("erica");
      car.tryMoveWith(input);
      expect(car.name).toBe("erica");
    }
  );

  it.each(testCases)(
    "자동차가 $name, 자동차의 현재 위치를 반환한다.",
    ({ input }) => {
      const car = new Car("erica", 0);
      let currentPosition = car.position;
      car.tryMoveWith(input);
      if (CAR_MOVE_CRITERIA <= input) {
        currentPosition += 1;
      }
      expect(car.position).toBe(currentPosition);
    }
  );
});
