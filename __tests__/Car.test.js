import Car from "../src/Car";

const DEFAULT_NAME = "jang";

describe("자동차", () => {
  test("자동차는 이름을 가질 수 있다.", () => {
    const car = new Car(DEFAULT_NAME);
    expect(car.name).toBe(DEFAULT_NAME);
  });

  test("자동차는 전진할 수 있다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.moveForward();
    expect(car.position).toBe(1);
  });

  test("자동차 이름과 전진 현황을 같이 출력할 수 있다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.moveForward(4);
    car.moveForward(5);
    expect(car.getStatus()).toBe(`${DEFAULT_NAME} : --`);
  });
});
