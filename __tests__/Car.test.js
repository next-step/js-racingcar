import {
  DUMMY_CORRECT_CARS,
  DUMMY_INCORRECT_CAR_NAMES,
  DUMMY_EXCEEDED_CAR_NAMES,
  DUMMY_NOT_STRING_CAR_NAMES
} from './constants';
import { CAR_CONFIGURE, ERROR_MESSAGE } from '../src/domain/constants/index';
import { Car } from '../src/domain/classes/index';

const getCarMoved = (name, distance) => {
  const car = new Car(name);
  car.move(distance);
  return car.moved;
};
describe('자동차 테스트', () => {
  test.each(DUMMY_CORRECT_CARS)('자동차는 이름($name)을 가져야 한다.', ({ name }) => {
    const car = new Car(name);
    expect(car.name).toBe(name);
  });

  test.each(DUMMY_INCORRECT_CAR_NAMES)('자동차 이름($name)에 공백만 존재한다면 오류가 발생한다.', ({ name }) => {
    expect(() => {
      new Car(name);
    }).toThrowError(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAME);
  });

  test.each(DUMMY_EXCEEDED_CAR_NAMES)(
    `자동차 이름($name)에서 ${CAR_CONFIGURE.NAME_MAX_LENGTH}글자를 초과하면 오류가 발생한다.`,
    ({ name }) => {
      expect(() => {
        new Car(name);
      }).toThrowError(ERROR_MESSAGE.CAR_NAME_INCORRECT_LENGTH);
    }
  );
  test.each(DUMMY_NOT_STRING_CAR_NAMES)(`자동차 이름($name)이 문자열 형식이 아니면 오류가 발생한다. `, ({ name }) => {
    expect(() => {
      new Car(name);
    }).toThrowError(ERROR_MESSAGE.CAR_NAME_NOT_STRING);
  });

  test.each(DUMMY_CORRECT_CARS)(
    '자동차 경주에서 거리 값이 4 미만이면 전진하지 않는다. (자동차: $name, 거리:$movableDistance)',
    ({ name, notMovableDistance }) => {
      const carMoved = getCarMoved(name, notMovableDistance);
      expect(carMoved).toBe(0);
    }
  );

  test.each(DUMMY_CORRECT_CARS)(
    '자동차 경주에서 거리 값이 4 이상일 때 전진한다. (자동차: $name, 거리:$movableDistance)',
    ({ name, movableDistance }) => {
      const carMoved = getCarMoved(name, movableDistance);
      expect(carMoved).toBe(1);
    }
  );
});
