import {
  DUMMY_CARS,
  DUMMY_INPUT_CAR_NAMES,
  DUMMY_INCORRECT_INPUT_CAR_NAMES,
  DUMMY_RACE_SET,
  DUMMY_WINNER_RACE_SET,
  DUMMY_DUPLICATE_WINNER_RACE_SET
} from './constants';
import { ERROR_MESSAGE, RACE_CONFIGURE } from '../src/constants/index';
import { CarRaceOrganizer, Car } from '../src/classes/index';

const { MAX_LAP } = RACE_CONFIGURE;

const getRaceWinners = (raceModel) => {
  const carRaceOrganizer = new CarRaceOrganizer(raceModel);
  carRaceOrganizer.printWinners();
  return carRaceOrganizer.winners;
};

const getCars = (inputCars) => {
  return inputCars.map((name) => new Car(name));
};

describe('자동차 경주 테스트', () => {
  beforeEach(() => {
    logSpy = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    logSpy.mockClear();
  });

  it('경주를 시작하기 위해 반드시 참여하는 자동차 이름을 입력받아야한다.', () => {
    expect(() => {
      new CarRaceOrganizer();
    }).toThrowError(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAMES);
  });

  test.each(DUMMY_INPUT_CAR_NAMES)(
    '자동차 경주에 참여하는 자동차 이름은 쉼표(,)로 구분하여 입력한다.($input)',
    ({ input }) => {
      const cars = getCars(input);
      expect(() => {
        new CarRaceOrganizer(cars);
      }).not.toThrow();
    }
  );

  test.each(DUMMY_INCORRECT_INPUT_CAR_NAMES)('경주에 참여하는 자동차 이름은 중복이될 수 없다.', ({ input }) => {
    const cars = getCars(input);
    expect(() => {
      new CarRaceOrganizer(cars);
    }).toThrow(ERROR_MESSAGE.DUPLICATE_CAR);
  });

  test.each(DUMMY_RACE_SET)('자동차 주행 횟수마다 lap이 변경된다.', ({ input }) => {
    const cars = getCars(input);
    const carRaceOrganizer = new CarRaceOrganizer(cars);
    expect(carRaceOrganizer.lap).toBe(0);
    carRaceOrganizer.runSingleRace();
    carRaceOrganizer.nextLap();
    expect(carRaceOrganizer.lap).toBe(1);
  });

  it('자동차 주행 횟수 마다 경주 상태를 출력한다.', () => {
    const cars = getCars(DUMMY_CARS);
    const carRaceOrganizer = new CarRaceOrganizer(cars);
    carRaceOrganizer.runSingleRace();
    carRaceOrganizer.printRace();
    expect(logSpy).toHaveBeenCalledTimes(DUMMY_CARS.length);
  });

  it(`자동차 경주는 총 ${MAX_LAP}회로 이루어진다.`, () => {
    const cars = getCars(DUMMY_CARS);
    const carRaceOrganizer = new CarRaceOrganizer(cars);
    for (let lap = 0; lap < MAX_LAP; lap += 1) {
      expect(carRaceOrganizer.lap).toBe(lap);
      carRaceOrganizer.nextLap();
    }
    carRaceOrganizer.nextLap();
    expect(carRaceOrganizer.lap).toBe(MAX_LAP);
  });

  it('자동차 경주 종료 후, 많은 거리를 이동한 자동차가 우승한다.', () => {
    const winners = getRaceWinners(DUMMY_WINNER_RACE_SET);
    expect(winners).toHaveLength(1);
    expect(winners.pop()).toBe('peach');
  });

  it('우승자는 여러 명일 수 있다.', () => {
    const winners = getRaceWinners(DUMMY_DUPLICATE_WINNER_RACE_SET);
    expect(winners).toHaveLength(2);
  });
});
