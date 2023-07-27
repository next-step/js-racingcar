import { Car, RUN_THRESHOLD, RUN_UNIT, START_POSITION } from "../src/Car";

describe("Car", () => {
  const DEFAULT_NAME = "sonata";
  let car;
  beforeEach(() => {
    car = new Car(DEFAULT_NAME);
  });
  it("자동차의 이름을 알 수 있다.", () => {
    expect(car.getName()).toBe(DEFAULT_NAME);
  });
  it(`자동차는 ${RUN_THRESHOLD} 이상의 입력값을 받으면 전진할 수 있다.`, () => {
    car.run(4);
    expect(car.getPosition()).toBe(START_POSITION + RUN_UNIT);
  });
  it("자동차는 ${RUN_THRESHOLD} 미만의 입력값을 받으면 전진할 수 없다.", () => {
    car.run(3);
    expect(car.getPosition()).toBe(START_POSITION);
  });
});
