import Car from "../src/Car.js";
import {
  CAR_MOVE_PER_RACING,
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
      expect(car.getCurrentPosition()).toBe(TOTAL_RACING_COUNT);
    });
  });

  it("경주에 참가하는 자동차들의 이름은 중복되지 않는다.", () => {
    expect(() => {
      new Racing("NEXT,NEXT");
    }).toThrow(`자동차의 이름은 중복되지 않아야 한다.`);
  });
});

describe("자동차 단위 테스트", () => {
  it(`자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자, 최대 ${MAX_CAR_NAME_LENGTH}자이다.`, () => {
    const car = new Car("N");
    expect(car.getName()).toBe("N");
  });

  it(`자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자여야 한다.`, () => {
    expect(() => new Car("")).toThrow(
      `자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자, 최대 ${MAX_CAR_NAME_LENGTH}자이다.`
    );
  });

  it(`자동차의 이름은 ${MAX_CAR_NAME_LENGTH}자를 넘으면 오류가 난다.`, () => {
    expect(() => new Car("NEXTSTEP")).toThrow(
      `자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자, 최대 ${MAX_CAR_NAME_LENGTH}자이다.`
    );
  });

  it("자동차는 위치 값을 가지며, 초기 상태는 0이다", () => {
    const car = new Car("NEXT");
    expect(car.getCurrentPosition()).toEqual(0);
  });

  it(`자동차는 전진할 수 있으며 한 번에 ${CAR_MOVE_PER_RACING}만큼 전진한다`, () => {
    const car = new Car("NEXT");
    car.move();
    expect(car.getCurrentPosition()).toEqual(CAR_MOVE_PER_RACING);
  });
});
