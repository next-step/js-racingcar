import Car from "../../../src/domain/car.js";
import { Cars } from "../../../src/domain/cars.js";
import { Winner } from "../../../src/domain/winner.js";

describe("winner", () => {
  it("단독 우승자의 자동차 이름을 알려줍니다.", () => {
    const carList = [
      new Car("아반떼", 1),
      new Car("레이", 2),
      new Car("쏘나타", 3),
    ];

    const winner = new Winner({ cars: Cars.fromList(carList) });

    expect(winner.getCarNameList()).toEqual(["쏘나타"]);
  });
  it("공동 우승자의 자동차 이름을 알려줍니다.", () => {
    const carList = [
      new Car("아반떼", 1),
      new Car("레이", 2),
      new Car("쏘나타", 2),
    ];

    const winner = new Winner({ cars: Cars.fromList(carList) });

    expect(winner.getCarNameList()).toEqual(["레이", "쏘나타"]);
  });
  it("자동차가 한 대일 경우 한 대의 자동차 이름을 알려줍니다.", () => {
    const carList = [new Car("아반떼", 1)];

    const winner = new Winner({ cars: Cars.fromList(carList) });

    expect(winner.getCarNameList()).toEqual(["아반떼"]);
  });
});
