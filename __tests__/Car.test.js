import Game from "../src/Models/Game.js";
import Car from "../src/Models/Car.js";
import { getRandomIntRangeOf } from "../src/utils";

const CAR_MOVE_CRITERIA = Game.CAR_MOVE_CRITERIA;
const CAR_MOVE_STEP = Game.CAR_MOVE_STEP;
const RANDOM_NUM_LOWER_LIMIT = Game.RANDOM_NUM_LOWER_LIMIT;
const RANDOM_NUM_UPPER_LIMIT = Game.RANDOM_NUM_UPPER_LIMIT;
const CAR_INIT_POSITION = Car.CAR_INITIAL_POSITION;
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
    `자동차 이름이 $name인 경우, 에러를 발생시킨다.`,
    ({ input, expected }) => {
      () => new Car(input, CAR_INIT_POSITION).toThrow(expected);
    }
  );

  it("유효한 자동차 이름이라면 오류를 발생시키지 않는다.", () => {
    expect(() => new Car(VALID_NAME)).not.toThrow();
  });

  it("유효한 자동차 이름이라면, 자동차 객체를 생성하고 이름과 현재 위치를 상태값으로 갖는다.", () => {
    const car = new Car(VALID_NAME, CAR_INIT_POSITION);

    expect(car.name).toBeDefined();
    expect(car.position).toBeDefined();
  });
});

describe(`[feature2] 자동차는 ${CAR_MOVE_CRITERIA} 이상이면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
  const car = new Car(VALID_NAME, CAR_INIT_POSITION);

  let testCases = [];
  for (let i = RANDOM_NUM_LOWER_LIMIT; i < RANDOM_NUM_UPPER_LIMIT; i++) {
    testCases.push({
      name: i,
      input: i,
    });
  }
  const movableTCs = testCases.slice(CAR_MOVE_CRITERIA, testCases.length);
  const immovableTCs = testCases.slice(0, CAR_MOVE_CRITERIA);

  it.each(movableTCs)(
    `자동차는 무작위 값이 ${CAR_MOVE_CRITERIA} 이상인 $name이면, 전진한다.`,
    ({ input }) => {
      const PREV_POS = car.position;
      car.tryMoveWith(input);
      expect(car.position).toBe(PREV_POS + CAR_MOVE_STEP);
    }
  );

  it.each(immovableTCs)(
    `자동차는 무작위 값이 ${CAR_MOVE_CRITERIA} 미만인 $name이면, 현재 위치를 유지한다.`,
    ({ input }) => {
      const CURR_POS = car.position;
      car.tryMoveWith(input);
      expect(car.position).toBe(CURR_POS);
    }
  );
});

describe("[feature3] 자동차의 현재 상황 정보를 반환한다.", () => {
  const car = new Car(VALID_NAME, CAR_INIT_POSITION);

  const testCases = [
    { name: "현재 위치를 유지", input: CAR_MOVE_CRITERIA - 1 },
    {
      name: `현재 위치에서 ${CAR_MOVE_STEP}만큼 전진`,
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
    "자동차가 $name 경우, 자동차의 현재 위치를 반환한다.",
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
