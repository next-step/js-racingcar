// Phase 1
import Car from "../src/Car.js";
import {
  CAR_INIT_POSITION,
  CAR_MOVE_CRITERIA,
  CAR_MOVE_STEP,
  ERROR_MESSAGE,
  RANDOM_NUM_LOWER_LIMIT,
  RANDOM_NUM_UPPER_LIMIT,
} from "../src/constants/settings.js";
import { getRandomIntRangeOf } from "../src/utils/utils.js";

/**
 * 테스트 파일에서 사용하는 공통 상수
 */
const VALID_NAME = "erica";
const RANDOM_MOVABLE_NUM = getRandomIntRangeOf(
  CAR_MOVE_CRITERIA,
  RANDOM_NUM_UPPER_LIMIT
);
const RANDOM_UNMOVABLE_NUM = getRandomIntRangeOf(
  RANDOM_NUM_LOWER_LIMIT,
  CAR_MOVE_CRITERIA - 1
);

describe("[feature1] 자동차는 이름의 유효성을 확인하고, 유효할 경우만 자동차 객체를 생성한다.", () => {
  it("자동차 이름이 5자 초과인 경우, 에러를 발생시킨다.", () => {
    const INVALID_LONG_NAME = "ericagong";
    expect(() => new Car(INVALID_LONG_NAME)).toThrow(
      ERROR_MESSAGE.LONG_CAR_NAME
    );
  });

  it("유효한 입력값이라면 정상 동작한다.", () => {
    expect(() => new Car(VALID_NAME)).not.toThrow();
  });
});

describe("[feature2] 자동차는 4 이상이면 전진하고, 아니면 현재 위치를 유지한다.", () => {
  const car = new Car(VALID_NAME, CAR_INIT_POSITION);

  it("자동차는 이름과, 현재 위치를 상태값으로 갖는다.", () => {
    expect(car.name).toBeDefined();
    expect(car.position).toBeDefined();
  });

  it("자동차는 무작위 값이 4 이상이면 전진한다.", () => {
    const PREV_POS = car.position;
    car.tryMoveWith(RANDOM_MOVABLE_NUM);
    expect(car.position).toBe(PREV_POS + CAR_MOVE_STEP);
  });

  it("자동차는 무작위 값이 4 미만이면, 현재 위치를 유지한다.", () => {
    const PREV_POS = car.position;
    car.tryMoveWith(RANDOM_UNMOVABLE_NUM);
    expect(car.position).toBe(PREV_POS);
  });
});

describe("[feature3] 자동차의 현재 상황 정보를 반환한다.", () => {
  const car = new Car(VALID_NAME, CAR_INIT_POSITION);
  const PREV_POS = car.position;
  car.tryMoveWith(RANDOM_MOVABLE_NUM);

  it("자동차의 이름 정보를 반환한다.", () => {
    expect(car.name).toBe(VALID_NAME);
  });

  it("자동차의 현재 위치 정보를 반환한다.", () => {
    expect(car.position).toBe(PREV_POS + CAR_MOVE_STEP);
  });
});
