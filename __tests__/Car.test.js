// Phase 1
import Car from "../src/Car.js";
import {
  CAR_INIT_POSITION,
  CAR_MOVE_CRITERIA,
  CAR_MOVE_STEP,
  RANDOM_NUM_LOWER_LIMIT,
  RANDOM_NUM_UPPER_LIMIT,
} from "../src/constants/settings.js";
import { getRandomIntRangeOf } from "../src/utils/utils.js";

describe("[feature2] 자동차는 4 이상이면 전진하고, 아니면 현재 위치를 유지한다.", () => {
  const NAME = "erica";
  const car = new Car(NAME, CAR_INIT_POSITION);

  it("자동차는 이름과, 현재 위치를 상태값으로 갖는다.", () => {
    expect(car.name).toBe(NAME);
    expect(car.position).toBe(CAR_INIT_POSITION);
  });

  it("자동차는 무작위 값이 4 이상이면 전진한다.", () => {
    const PREV_POS = car.position;
    const RANDOM_NUM = getRandomIntRangeOf(
      CAR_MOVE_CRITERIA,
      RANDOM_NUM_UPPER_LIMIT
    );

    car.tryMoveWith(RANDOM_NUM);
    expect(car.position).toBe(PREV_POS + CAR_MOVE_STEP);
  });

  it("자동차는 무작위 값이 4 미만이면, 현재 위치를 유지한다.", () => {
    const PREV_POS = car.position;
    const RANDOM_NUM = getRandomIntRangeOf(
      RANDOM_NUM_LOWER_LIMIT,
      CAR_MOVE_CRITERIA - 1
    );
    car.tryMoveWith(RANDOM_NUM);

    expect(car.position).toBe(PREV_POS);
  });
});
