import { DUMMY_CORRECT_CARS, DUMMY_EXCEEDED_CAR_NAME, DUMMY_NOT_STRING_CAR_NAMES } from './constants';
import { NAME_CONFIGURE, ERROR_MESSAGE } from '../src/constants/index';
import { Car } from '../src/classes/index';
import { validateCarName, validateCarNameType } from '../src/race/index';

describe('자동차 이름 충족 조건 테스트', () => {
  test.each(DUMMY_CORRECT_CARS)('자동차는 이름($name)을 가져야 한다.', ({ name }) => {
    const car = new Car(name);
    expect(car.getName()).toBe(name);
  });

  it('자동차 이름은 공백일 수 없다.', () => {
    const { MIN_LENGTH: min, MAX_LENGTH: max } = NAME_CONFIGURE;
    expect(() => validateCarName('', { min, max })).toThrow(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAME);
    expect(() => validateCarName(' ', { min, max })).toThrow(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAME);
  });

  test.each(DUMMY_EXCEEDED_CAR_NAME)(
    `자동차 이름($name)은 최대${NAME_CONFIGURE.MAX_LENGTH} 글자 까지 허용한다.`,
    ({ name }) => {
      const { MIN_LENGTH: min, MAX_LENGTH: max } = NAME_CONFIGURE;
      expect(() => validateCarName(name, { min, max })).toThrow(ERROR_MESSAGE.CAR_NAME_INCORRECT_LENGTH);
    }
  );

  test.each(DUMMY_NOT_STRING_CAR_NAMES)(`자동차 이름($name)은 문자열 타입만 허용한다. `, ({ name }) => {
    expect(() => validateCarNameType(name)).toThrow(ERROR_MESSAGE.CAR_NAME_NOT_STRING);
  });
});
