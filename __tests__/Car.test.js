import {
  DUMMY_CORRECT_CARS,
  DUMMY_INCORRECT_LENGTH_CARS_NAMES,
  DUMMY_NOT_STRING_CAR_NAMES,
  DUMMY_INPUT_CAR_NAMES,
  DUMMY_INCORRECT_INPUT_CAR_NAMES
} from './constants';
import { NAME_CONFIGURE, ERROR_MESSAGE } from '../src/constants/index';
import { validateCarName } from '../src/utils/index';
import Car from '../src/Car';
import CarPrompter from '../src/CarPrompter';

describe('자동차 이름 충족 조건 테스트', () => {
  test.each(DUMMY_CORRECT_CARS)('자동차는 이름($name)을 가질 수 있다.', ({ name }) => {
    const car = new Car(name);
    expect(car.name).toBe(name);
  });

  test.each(DUMMY_INCORRECT_LENGTH_CARS_NAMES)(
    `자동차 이름($name)은 최소 ${NAME_CONFIGURE.MIN_LENGTH}글자 이상 최대${NAME_CONFIGURE.MAX_LENGTH} 글자 까지 허용한다.`,
    ({ name }) => {
      expect(() => validateCarName(name)).toThrow(ERROR_MESSAGE.CAR_NAME_INCORRECT_LENGTH);
    }
  );

  test.each(DUMMY_NOT_STRING_CAR_NAMES)(
    `자동차 이름($name)은 문자열 타입만 허용한다. `,
    ({ name }) => {
      expect(() => validateCarName(name)).toThrow(ERROR_MESSAGE.CAR_NAME_NOT_STRING);
    }
  );
});

describe('자동차 경주 테스트', () => {
  test.each(DUMMY_INPUT_CAR_NAMES)(
    '자동차 경주에 참여하는 자동차 이름은 쉼표(,)로 구분하여 입력한다.($input)',
    ({ input }) => {
      expect(() => {
        CarPrompter.validate(input);
      }).not.toThrow();
    }
  );

  test.each(DUMMY_INCORRECT_INPUT_CAR_NAMES)(
    '경주에 참여하는 자동차는 중복이될 수 없다.',
    ({ input }) => {
      expect(() => {
        CarPrompter.validate(input);
      }).toThrow(ERROR_MESSAGE.DUPLICATE_CAR);
    }
  );
});
