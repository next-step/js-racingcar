import Car from "../src/Models/Car.js";
import Game from "../src/Models/Game.js";

const CAR_MOVE_CRITERIA = Game.CAR_MOVE_CRITERIA;
const CAR_MOVE_STEP = Game.CAR_MOVE_STEP;
const RANDOM_NUM_LOWER_LIMIT = Game.RANDOM_NUM_LOWER_LIMIT;
const RANDOM_NUM_UPPER_LIMIT = Game.RANDOM_NUM_UPPER_LIMIT;
const CAR_INITIAL_POSITION = Car.INITIAL_POSITION;
const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;
const CAR_NAME_MAX_LENGTH = Car.NAME_MAX_LENGTH;
const VALID_NAME = "erica";

describe("[feature1] 자동차는 이름의 유효성을 확인하고, 유효할 경우만 자동차 객체를 생성한다.", () => {
  it.each([
    { name: "빈 값", input: "", expected: CAR_ERROR_MESSAGE.EMPTY_NAME },
    {
      name: `${CAR_NAME_MAX_LENGTH}자 초과`,
      input: "ericagong",
      expected: CAR_ERROR_MESSAGE.LONG_NAME,
    },
  ])(
    `자동차 이름이 $name인 경우, 에러를 발생시킨다. (input = $input)`,
    ({ input, expected }) => {
      () => new Car(input, CAR_INITIAL_POSITION).toThrow(expected);
    }
  );

  it("유효한 자동차 이름이라면 오류를 발생시키지 않는다.", () => {
    expect(() => new Car(VALID_NAME)).not.toThrow();
  });

  it("유효한 자동차 이름이라면, 자동차 객체를 생성하고 이름과 현재 위치를 상태값으로 갖는다.", () => {
    const car = new Car(VALID_NAME);

    expect(car.name).toBe(VALID_NAME);
    expect(car.position).toBe(CAR_INITIAL_POSITION);
  });
});

describe(`[feature2] 자동차는 전진조건에 부합하면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
  let testCases = [];
  for (let i = RANDOM_NUM_LOWER_LIMIT; i < RANDOM_NUM_UPPER_LIMIT; i++) {
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
      const car = new Car(VALID_NAME, CAR_INITIAL_POSITION);

      const PREVIOUS_POSITION = car.position;

      car.tryMoveWith(input);

      expect(car.position).toBe(PREVIOUS_POSITION);
    }
  );
  it.each(movableTestCases)(
    `자동차는 전진 조건에 부합하면, 전진한다. (input = $input)`,
    ({ input }) => {
      const car = new Car(VALID_NAME, CAR_INITIAL_POSITION);

      const PREVIOUS_POSITION = car.position;

      car.tryMoveWith(input);

      expect(car.position).toBe(PREVIOUS_POSITION + CAR_MOVE_STEP);
    }
  );
});

describe("[feature3] 자동차의 현재 상황 정보를 반환한다.", () => {
  const car = new Car(VALID_NAME);

  const testCases = [
    { name: "현재 위치를 유지하는 경우", input: CAR_MOVE_CRITERIA - 1 },
    {
      name: `현재 위치에서 ${CAR_MOVE_STEP}만큼 전진하는 경우`,
      input: CAR_MOVE_CRITERIA,
    },
  ];

  it.each(testCases)(
    "자동차가 $name 경우, 자동차의 이름을 반환한다.",
    ({ input }) => {
      car.tryMoveWith(input);

      expect(car.name).toBe(VALID_NAME);
    }
  );

  it.each(testCases)(
    "자동차가 $name, 자동차의 현재 위치를 반환한다.",
    ({ input }) => {
      const PREVIOUS_POSITION = car.position;

      car.tryMoveWith(input);

      let currentPosition = PREVIOUS_POSITION;
      if (CAR_MOVE_CRITERIA <= input) {
        currentPosition += CAR_MOVE_STEP;
      }

      expect(car.position).toBe(currentPosition);
    }
  );
});
