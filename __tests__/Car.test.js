import { Car, Race } from "../src";
import { NAME_ERROR_MESSAGE, NUM_ERROR_MESSAGE } from "../src/constants";

const CAR_NAME = "hello";

describe("자동차  경주 게임", () => {
  describe("자동차", () => {
    test("자동차 이름을 가질 수 있다", () => {
      const car = new Car(CAR_NAME);
      expect(car.getName()).toBe(CAR_NAME);
    });
    test("자동차는 전진할 수 있다", () => {
      const car = new Car(CAR_NAME);
      car.run(4);
      expect(car.getPosition()).toBe(1);
    });
    test("자동차 이름은 문자열입니다", () => {
      expect(() => {
        new Car();
      }).toThrowError(NAME_ERROR_MESSAGE.NOT_STRING);
    });
    test("자동차 이름은 1-5 글자입니다", () => {
      expect(() => {
        new Car("helloo");
      }).toThrowError(NAME_ERROR_MESSAGE.NOT_IN_RANGE);
    });
    test("자동차 이름에 콤마가 들어가선 안됩니다", () => {
      expect(() => {
        new Car("hell,oo");
      }).toThrowError(NAME_ERROR_MESSAGE.NOT_ALLOW_CHARACTER);
    });
    test("자동차는 전진할때 숫자를 입력받는다", () => {
      const car = new Car(CAR_NAME);
      expect(() => {
        car.run(undefined);
      }).toThrowError(NUM_ERROR_MESSAGE.NOT_NUMBER);
    });
    test("자동차는 전진할때 0-9 사이 숫자입니다", () => {
      const car = new Car(CAR_NAME);
      expect(() => {
        car.run(11);
      }).toThrowError(NUM_ERROR_MESSAGE.NOT_IN_RANGE);
    });
  });
  describe("경주", () => {
    test("경주는 자동차 객체를 받는다", () => {
      const cars = [new Car("h"), new Car("e"), new Car("l"), new Car("0")];
      expect(new Race(cars).getCars()).toBe(cars);
    });
    test("경주룰 시작한다", () => {
      const cars = [new Car("h"), new Car("e"), new Car("l"), new Car("0")];
      const race = new Race(cars);
      expect(race.getStarted()).toBe(false);
      for (const result of race.start()) {
        expect(result).toHaveLength(cars.length);
      }
    });
    test("경주결과를 볼수 있다", () => {
      const cars = [new Car("h"), new Car("e"), new Car("l"), new Car("0")];
      const race = new Race(cars);
      race.start();
      expect(race.getResult()).toBeInstanceOf(Array);
    });
  });
});
