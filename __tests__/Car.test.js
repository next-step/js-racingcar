import Car from "../src/domain/Car.js";

describe("자동차 테스트", () => {
  const CAR_NAME = "벤틀리";
  const INITIAL_LOCATION = 0;

  it("자동차에 이름을 부여할 수 있다", () => {
    const car = new Car(CAR_NAME);
    expect(car.name).toEqual(CAR_NAME);
  });

  it("자동차 이름은 1자 이상 5자 이하로 설정해야 한다.", () => {
    expect(() => new Car("Bentley")).toThrow(Car.NAME_LENGTH_ERROR_MESSAGE);
    expect(() => new Car("")).toThrow(Car.NAME_LENGTH_ERROR_MESSAGE);
    expect(() => new Car("벤틀리")).not.toThrow();
  });

  it("자동차 이름 앞 뒤에 공백이 포함된 경우 제거된다", () => {
    const car = new Car(" 벤틀리 ");
    expect(car.name).toBe("벤틀리");
  });

  it("자동차 위치의 초기 값은 0이다.", () => {
    const car = new Car(CAR_NAME);
    expect(car.location).toEqual(INITIAL_LOCATION);
  });

  it("자동차에 전진 조건을 부여할 수 있다.", () => {
    const car = new Car(CAR_NAME);
    const randomNumber = Math.floor(Math.random() * 10);

    car.forward(() => randomNumber >= 4);

    if (randomNumber >= 4) {
      expect(car.location).toBe(INITIAL_LOCATION + 1);
    }
    if (randomNumber < 4) {
      expect(car.location).toBe(INITIAL_LOCATION);
    }
  });

  it("자동차가 전진할 경우 위치값이 1 증가한다.", () => {
    const car = new Car(CAR_NAME);

    car.forward(() => true);

    expect(car.location).toEqual(INITIAL_LOCATION + 1);
  });
});
