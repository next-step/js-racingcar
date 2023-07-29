import {
  DUMMY_CORRECT_CARS,
  DUMMY_INCORRECT_LENGTH_CARS,
  DUMMY_NOT_STRING_CAR_NAMES,
  DUMMY_INPUT_CAR_NAMES,
  DUMMY_INCORRECT_INPUT_CAR_NAMES,
  DUMMY_RACE_SET
} from './constants';
import {
  NAME_CONFIGURE,
  ERROR_MESSAGE,
  RACE_CONFIGURE,
  ALERT_MESSAGE
} from '../src/constants/index';
import { validateCarName } from '../src/utils/index';
import Car from '../src/Car';
import CarPrompter from '../src/CarPrompter';
import CarRace from '../src/CarRace';

const { TRACK, MOVE_CONDITION, MAX_LAP } = RACE_CONFIGURE;
describe('자동차 이름 충족 조건 테스트', () => {
  test.each(DUMMY_CORRECT_CARS)('자동차는 이름($name)을 가질 수 있다.', ({ name }) => {
    const car = new Car(name);
    expect(car.name).toBe(name);
  });

  test.each(DUMMY_INCORRECT_LENGTH_CARS)(
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

  it(`자동차 경주는 총 ${MAX_LAP}회로 이루어진다.`, () => {
    const carRace = new CarRace();
    for (let lap = 0; lap < MAX_LAP; lap += 1) {
      expect(carRace.getCurrentLap()).toBe(lap);
      carRace.nextLap();
    }
    carRace.nextLap();
    expect(carRace.getCurrentLap()).toBe(MAX_LAP);
  });

  test.each(DUMMY_CORRECT_CARS)(
    `자동차 경주에서 거리 값이 ${MOVE_CONDITION} 이상일 때 전진한다. (자동차: $name, 거리:$movableDistance)`,
    ({ name, movableDistance }) => {
      const car = new Car(name);
      car.move(movableDistance >= MOVE_CONDITION);
      expect(car.movedTrack).toBe(1);
    }
  );

  test.each(DUMMY_CORRECT_CARS)(
    `자동차 경주에서 거리 값이 ${MOVE_CONDITION} 미만이면 멈춘다. (자동차: $name, 거리:$movableDistance)`,
    ({ name, notMovableDistance }) => {
      const car = new Car(name);
      car.move(notMovableDistance >= MOVE_CONDITION);
      expect(car.movedTrack).toBe(0);
    }
  );

  it('자동차 주행 횟수 마다 경주 상태를 출력한다.', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const carRace = new CarRace(DUMMY_RACE_SET);
    carRace.race();
    carRace.print();
    expect(logSpy).toHaveBeenCalledTimes(DUMMY_RACE_SET.length);
  });
});
