import Car from "../src/domain/Car.js";
import { MINIMUM_CAR_NAME_LENGTH, MOVE_THRESHOLD } from "../src/constants/index.js";
import { MAXIMUM_CAR_NAME_LENGTH } from "../src/constants/index.js";
/**
## 자동차
- [x] 자동차는 5자 이하의 이름을 갖는다.
- [x] 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우, 전진한다
 */

describe("자동차 기능 테스트", () => {
  test("자동차는 1자 이상, 5자 이하의 이름을 갖는다.", () => {
    // given
    const car = new Car("car1");

    // when
    const name = car.name;

    // then
    expect(name.length).toBeLessThanOrEqual(MAXIMUM_CAR_NAME_LENGTH);
    expect(name.length).toBeGreaterThanOrEqual(MINIMUM_CAR_NAME_LENGTH);
  });

  test("전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후, 무작위 값이 4 이상일 경우이다.", () => {
    // given
    const car = new Car("test");
    
    // when
    const randomValue = car.getRandomValue();
    car.moveForward(randomValue);

    // then
    expect(car.position).toBe(randomValue >= MOVE_THRESHOLD ? 1 : 0);
  })
});