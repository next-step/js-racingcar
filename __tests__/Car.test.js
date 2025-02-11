import Car from "../src/car/index.js";
import carGame from "../src/functions/index.js";

describe("자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
  it("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("boky");

    expect(car.name).toEqual("boky");
  });

  it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const car = new Car("boky");

    // 초기 상태
    expect(car.getStatus()).toEqual(`boky : `);
    // 전진
    car.move();
    expect(car.getStatus()).toEqual(`boky : -`);
  });
});
