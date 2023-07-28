// Phase 1
import Car from "../src/Car.js";

describe("[feature2] 자동차는 4 이상이면 전진하고, 아니면 현재 위치를 유지한다.", () => {
  const NAME = "erica";
  const CAR_INIT_POSITION = 0;
  const car = new Car(NAME, CAR_INIT_POSITION);

  it("자동차는 이름과, 현재 위치를 상태값으로 갖는다.", () => {
    expect(car.name).toBe(NAME);
    expect(car.position).toBe(CAR_INIT_POSITION);
  });

  it("자동차는 무작위 값이 4 이상이면 전진한다.", () => {
    const prevPosition = car.position;
    car.tryMoveWith(4);

    expect(car.position).toBe(prevPosition + 1);
  });

  it("자동차는 무작위 값이 4 미만이면, 현재 위치를 유지한다.", () => {
    const prevPosition = car.position;
    car.tryMoveWith(3);

    expect(car.position).toBe(prevPosition);
  });
});
