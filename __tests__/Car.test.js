import Car from "../src/Car.js";
import {
  CAR_MOVE_PER_RACING,
  FORWARD_CONDITION,
  MAX_CAR_NAME_LENGTH,
  MIN_CAR_NAME_LENGTH,
  TOTAL_RACING_COUNT,
} from "../src/constants.js";
import Racing from "../src/Racing.js";

describe("경주 단위 테스트", () => {
  it(`경주는 총 ${TOTAL_RACING_COUNT}회 진행된다`, () => {
    const racing = new Racing("NEXT,STEP");
    racing.start();
    racing.getCars((car) => {
      expect(car.getCurrentPosition()).toBeLessThanOrEqual(TOTAL_RACING_COUNT);
    });
  });

  it("경주에 참가하는 자동차들의 이름은 중복되지 않는다.", () => {
    expect(() => {
      new Racing("NEXT,NEXT");
    }).toThrow(`자동차의 이름은 중복되지 않아야 한다.`);
  });
});

describe("자동차 단위 테스트", () => {
  it(`자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자이다.`, () => {
    expect(() => new Car("")).toThrow(
      `자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자이다.`
    );
  });

  it(`자동차의 이름은 최대 ${MAX_CAR_NAME_LENGTH}자이다.`, () => {
    expect(() => new Car("NNNNNN")).toThrow(
      `자동차의 이름은 최대 ${MAX_CAR_NAME_LENGTH}자이다.`
    );
  });

  it(`무작위 값이 ${FORWARD_CONDITION} 이상인 경우 ${CAR_MOVE_PER_RACING}칸씩 전진한다.`, () => {
    const car = new Car("NEXT");
    let prevPosition = car.getCurrentPosition();
    car.takeTurn(FORWARD_CONDITION);
    expect(car.getCurrentPosition()).toBe(prevPosition + CAR_MOVE_PER_RACING);
  });

  it(`무작위 값이 ${FORWARD_CONDITION} 미만인 경우 전진하지 않는다.`, () => {
    const car = new Car("NEXT");
    let prevPosition = car.getCurrentPosition();
    car.takeTurn(FORWARD_CONDITION - 1);
    expect(car.getCurrentPosition()).toBe(prevPosition);
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다", () => {
    const car = new Car("NEXT");
    expect(car.getCurrentPosition()).toEqual(0);
  });
});
