import { Cars } from "../../src/cars.js";
import { Racing } from "../../src/racing.js";

describe("racing", () => {
  it("자동차 경주는 1회 이상이어야 합니다.", () => {
    const cars = Cars.fromNames("아반떼");
    expect(() => new Racing({ cars: cars, phase: 0 })).toThrow();
  });
  it("자동차 경주를 진행하면 각 단계별 이동 기록이 저장됩니다.", () => {
    const cars = Cars.fromNames("아반떼");
    const racing = new Racing({ cars: cars, phase: 5 });

    racing.run();

    const history = racing.history.get(cars.value[0]);
    expect(history).toHaveLength(5);
  });
});
