import { Car } from "../../../src/domain/Car/Car";
import {
  MAX_NAME_LENGTH,
  RUN_THRESHOLD,
  RUN_UNIT,
  START_POSITION,
} from "../../../src/domain/Car/Car.const";
import {
  DEFAULT_CAR_NAME
} from "./Car.test.const"

describe("Car", () => {
  let car;

  beforeEach(() => {
    car = new Car(DEFAULT_CAR_NAME);
  });

  describe("constructor", () => {
    it("자동차의 이름이 한글자 미만일 경우 에러를 발생한다.", () => {
      const name = "";
      expect(() => {
        new Car(name);
      }).toThrow("이름은 공백을 제외한 한글자 이상이어야한다.");
    });

    it(`자동차의 이름이 ${MAX_NAME_LENGTH}글자를 넘어설 경우 에러를 발생한다.`, () => {
      const name = "";
      expect(() => {
        new Car(name);
      }).toThrow(`이름은 ${MAX_NAME_LENGTH}글자 이하이어야한다.`);
    });

    it(`입력으로 "${DEFAULT_CAR_NAME}"을 입력 받았을 때, 생성된 자동차의 이름은 "${DEFAULT_CAR_NAME}"이다.`, () => {
      expect(car.getName()).toBe(DEFAULT_CAR_NAME);
    });
  });

  describe("run", () => {
    it(`자동차는 ${RUN_THRESHOLD} 이상의 입력값을 받으면 전진할 수 있다.`, () => {
      car.run(4);
      expect(car.getPosition()).toBe(START_POSITION + RUN_UNIT);
    });
    it(`자동차는 ${RUN_THRESHOLD} 미만의 입력값을 받으면 전진할 수 없다.`, () => {
      car.run(3);
      expect(car.getPosition()).toBe(START_POSITION);
    });
  });

  describe("getPositionLog", () => {
    it(`자동차가 앞으로 간 이후에, 자동차의 위치를 출력하면 "-"가 ${RUN_UNIT}만큼 더 생긴다.`, () => {
      expect(car.getPositionLog()).toBe(
        `${DEFAULT_CAR_NAME} : ${"-".repeat(START_POSITION)}`
      );
      car.run(4);
      expect(car.getPositionLog()).toBe(
        `${DEFAULT_CAR_NAME} : ${"-".repeat(START_POSITION + RUN_UNIT)}`
      );
    });
  });
});
