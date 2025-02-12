import Car from '../src/car.js';
import {
  moveBackwardErrorMessage,
  nameLengthErrorMessage,
  nameTypeErrorMessage,
} from '../src/shared/validationError.js';

describe('자동차 경주 테스트', () => {
  const CAR_NAME = 'kia';

  let car = null;

  beforeEach(() => {
    car = new Car(CAR_NAME);
  });

  describe('자동차 이름 테스트', () => {
    it('자동차는 이름을 상태로 가질 수 있다.', () => {
      expect(car.getName()).toBe(CAR_NAME);
    });

    describe('자동차 경주 테스트 - 에러 처리', () => {
      it('자동차의 이름의 타입은 String만 입력할 수 있다.', () => {
        expect(() => new Car(123)).toThrow(nameTypeErrorMessage);
      });

      it('자동차의 이름은 1글자 이상 5글자 이하로 입력 하여야 한다.', () => {
        expect(() => new Car('')).toThrow(nameLengthErrorMessage);
      });
    });
  });

  describe('자동차 위치 테스트', () => {
    it('자동차는 위치 값을 가지며, 초기 상태는 0이다.', () => {
      expect(car.getLocation()).toBe(0);
    });

    it('자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.', () => {
      car.moveForward();
      expect(car.getLocation()).toBe(1);
      car.moveForward();
      expect(car.getLocation()).toBe(2);
    });

    it('location 0 상태 에서는 후진 시 에러를 뱉어야 합니다.', () => {
      expect(() => car.moveBackward()).toThrow(moveBackwardErrorMessage);
    });
  });
});
