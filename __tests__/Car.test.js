import Car from "../src/Car";
import { CAR_RACE_CONFIG } from "../src/constants";

describe("자동차 기능 테스트", () => {
  let car;

  beforeEach(() => {
    car = new Car("myCar");
  });

  test("자동차는 name과 position을 가진다", () => {
    expect(car).toEqual({ name: "myCar", position: 0 });
  });

  test("자동차는 초기 상태로 위치 값을 0을 가진다", () => {
    expect(car.position).toEqual(0);
  });

  test(`동차는 전진할 수 있으며 한 번에 ${CAR_RACE_CONFIG.DISTANCE_PER_MOVE}만큼 전진한다.`, () => {
    car.move();
    expect(car.position).toEqual(CAR_RACE_CONFIG.DISTANCE_PER_MOVE);
  });

  test.each([
    { move: 3, position: 3 * CAR_RACE_CONFIG.DISTANCE_PER_MOVE },
    { move: 5, position: 5 * CAR_RACE_CONFIG.DISTANCE_PER_MOVE },
  ])(
    "자동차가 $move 전진하면 위치 값은 $position이다.",
    ({ move, position }) => {
      Array.from({ length: move }).forEach(() => car.move());
      expect(car.position).toEqual(position);
    }
  );
});
