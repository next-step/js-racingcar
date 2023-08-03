import {
  DUMMY_CORRECT_CARS,
  DUMMY_INPUT_CAR_NAMES,
  DUMMY_INCORRECT_INPUT_CAR_NAMES,
  DUMMY_RACE_SET,
  DUMMY_DUPLICATE_WINNER_RACE_SET
} from './constants';
import { ERROR_MESSAGE, RACE_CONFIGURE } from '../src/constants/index';
import { CarRace } from '../src/classes/index';
import { validateDuplicateCars, validateInputMessage } from '../src/race/index';

const { MAX_LAP } = RACE_CONFIGURE;

const getRaceWinners = (raceModel) => {
  const carRace = new CarRace(raceModel);
  carRace.printWinners();
  return carRace.winners;
};

describe('자동차 경주 테스트', () => {
  beforeEach(() => {
    logSpy = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    logSpy.mockClear();
  });

  it('경주를 시작하기 위해 반드시 참여하는 자동차 이름을 입력받아야한다.', () => {
    expect(() => validateInputMessage()).toThrow(ERROR_MESSAGE.NOT_RECEIVED_INPUT);
  });

  test.each(DUMMY_INPUT_CAR_NAMES)(
    '자동차 경주에 참여하는 자동차 이름은 쉼표(,)로 구분하여 입력한다.($input)',
    ({ input }) => {
      expect(() => {
        validateInputMessage(input);
      }).not.toThrow();
    }
  );

  test.each(DUMMY_INCORRECT_INPUT_CAR_NAMES)('경주에 참여하는 자동차 이름은 중복이될 수 없다.', ({ input }) => {
    expect(() => {
      validateDuplicateCars(input);
    }).toThrow(ERROR_MESSAGE.DUPLICATE_CAR);
  });

  it('자동차 주행 횟수마다 lap이 변경된다.', () => {
    const carRace = new CarRace(DUMMY_RACE_SET);
    expect(carRace.lap).toBe(0);
    carRace.race();
    carRace.nextLap();
    expect(carRace.lap).toBe(1);
  });

  it('자동차 주행 횟수 마다 경주 상태를 출력한다.', () => {
    const carRace = new CarRace(DUMMY_RACE_SET);
    carRace.race();
    carRace.printRace();
    expect(logSpy).toHaveBeenCalledTimes(DUMMY_RACE_SET.length);
  });

  it(`자동차 경주는 총 ${MAX_LAP}회로 이루어진다.`, () => {
    const carRace = new CarRace();
    for (let lap = 0; lap < MAX_LAP; lap += 1) {
      expect(carRace.lap).toBe(lap);
      carRace.nextLap();
    }
    carRace.nextLap();
    expect(carRace.lap).toBe(MAX_LAP);
  });

  it('자동차 경주 종료 후, 많은 거리를 이동한 자동차가 우승한다.', () => {
    const winners = getRaceWinners(DUMMY_RACE_SET);
    expect(winners).toHaveLength(1);
    expect(winners.pop()).toBe('peach');
  });

  it('우승자는 여러 명일 수 있다. ', () => {
    const winners = getRaceWinners(DUMMY_DUPLICATE_WINNER_RACE_SET);
    expect(winners).toHaveLength(2);
  });
});
