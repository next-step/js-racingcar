import { Car, RUN_THRESHOLD, RUN_UNIT, START_POSITION } from "../src/Car";

describe("Car", () => {
  const DEFAULT_CAR_NAME = "sonata";
  let car;
  beforeEach(() => {
    car = new Car(DEFAULT_CAR_NAME);
  });
  it("자동차의 이름이 한글자 미만일 경우 에러를 발생시킨다.", () => {
    const name = "";
    expect(() => {
      new Car(name);
    }).toThrow("이름은 공백을 제외한 한글자 이상이어야합니다.");
  });
  it("자동차의 이름을 알 수 있다.", () => {
    expect(car.getName()).toBe(DEFAULT_CAR_NAME);
  });
  it(`자동차는 ${RUN_THRESHOLD} 이상의 입력값을 받으면 전진할 수 있다.`, () => {
    car.run(4);
    expect(car.getPosition()).toBe(START_POSITION + RUN_UNIT);
  });
  it(`자동차는 ${RUN_THRESHOLD} 미만의 입력값을 받으면 전진할 수 없다.`, () => {
    car.run(3);
    expect(car.getPosition()).toBe(START_POSITION);
  });
  it("자동차의 위치를 알 수 있다. (출력 가능한 형태", () => {
    expect(car.getPositionLog()).toBe(`${DEFAULT_CAR_NAME} : -`);
    car.run(4);
    expect(car.getPositionLog()).toBe(
      `${DEFAULT_CAR_NAME} : ${new Array(START_POSITION + RUN_UNIT)
        .fill("-")
        .join("")}`
    );
  });
});
