import Car from "../src/domain/car.js";

const DEFAULT_NAME = "jun";

const MOCK_RACE_COUNT = 2;

describe("자동차 이름 테스트", () => {
  test("자동차는 이름을 가질 수 있다", () => {
    const car = new Car(DEFAULT_NAME);
    expect(car.getName()).toBe(DEFAULT_NAME);
  });

  test("자동차 이름은 5글자 이하만 가능하다", () => {
    expect(() => {
      new Car("junjun");
    }).toThrow("자동차 이름은 5글자 이하만 가능하다.");
  });

  test("자동차 이름에 공백은 불가능하다", () => {
    expect(() => {
      new Car("");
    }).toThrow("자동차 이름을 1글자 이상만 가능하다.");
  });

  test("자동차 이름은 영어 문자열만 입력이 가능하다", () => {
    expect(() => {
      new Car("123!!");
    }).toThrow("자동차 이름은 영어 문자열만 가능하다.");
  });
});

describe("자동차 출발 테스트", () => {
  test("자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.run(4);
    expect(car.getPosition()).toBe(1);
  });

  test("자동차는 랜덤 숫자가 4 미만이면 정지한다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.run(3);
    expect(car.getPosition()).toBe(0);
  });
})
describe("자동차 우승자 테스트", () => {
  test("가장 많이 전진한 자동차를 우승자로 선정한다.", () => {
    const car1 = new Car('one');
    const car2 = new Car('two');
    const car3 = new Car('thre');

    car1.run(1);
    car2.run(5);
    car3.run(3);

    const cars = [car1, car2, car3];
    const winners = cars[0].getWinners(cars);

    expect(winners).toEqual(['two']);
  });

  test("여러 대의 자동차가 동시에 우승할 수 있다.", () => {
    const car1 = new Car('one');
    const car2 = new Car('two');
    const car3 = new Car('thre');

    car1.run(5);
    car2.run(5);
    car3.run(3);

    const cars = [car1, car2, car3];
    const winners = cars[0].getWinners(cars);

    expect(winners).toEqual(['one', 'two']);
  });

  test("startRace 메서드 테스트", () => {
    const carInstance = new Car('kim');
    carInstance.getCarName()
    carInstance.carCount(MOCK_RACE_COUNT);

    const consoleLog = jest.spyOn(console, 'log');

    carInstance.startRace();

    expect(consoleLog).toHaveBeenCalledWith(expect.stringContaining("최종 우승했습니다."));

    consoleLog.mockRestore();
  });
})