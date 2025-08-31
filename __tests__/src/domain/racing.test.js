import { Cars } from "../../../src/domain/cars.js";
import { Racing } from "../../../src/domain/racing.js";

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
  it("자동차 경주를 진행하여 각 단계별로 자동차의 움직임을 제어할 수 있습니다.", () => {
    const cars = Cars.fromNames("pobi,crong,honux");
    const racing = new Racing({ cars: cars });
    const forwardNumberList = [
      [4, 5, 6, 7, 8], // 5번 전진
      [4, 5, 6, 7, 3], // 4번 전진
      [4, 5, 6, 3, 2], // 3번 전진
    ];

    racing.run(forwardNumberList);

    const pobi = racing.history.get(cars.value[0]);
    const crong = racing.history.get(cars.value[1]);
    const honux = racing.history.get(cars.value[2]);
    expect(pobi).toEqual([1, 2, 3, 4, 5]);
    expect(crong).toEqual([1, 2, 3, 4, 4]);
    expect(honux).toEqual([1, 2, 3, 3, 3]);
  });
});
