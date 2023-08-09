import {
  DUMMY_INPUT_TOTAL_LAP,
  DUMMY_CARS,
  DUMMY_INPUT_CAR_NAMES,
  DUMMY_INCORRECT_INPUT_CAR_NAMES,
  DUMMY_RACE_SET,
  DUMMY_RACE_TOTAL_LAPS,
  DUMMY_INCORRECT_RACE_TOTAL_LAPS
} from './constants';
import { ERROR_MESSAGE } from '../src/constants/index';
import { CarRaceOrganizer, Car } from '../src/classes/index';

const getCars = (inputCars) => {
  return inputCars.map((name) => new Car(name));
};

const getRaceWinners = (cars) => {
  const carRaceOrganizer = new CarRaceOrganizer(cars, DUMMY_INPUT_TOTAL_LAP);
  carRaceOrganizer.printWinners();
  return carRaceOrganizer.winners;
};

describe('자동차 경주 테스트', () => {
  it('자동차 경주에 참여하는 자동차가 없을 시 오류가 발생한다.', () => {
    expect(() => {
      new CarRaceOrganizer();
    }).toThrowError(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAMES);
  });

  test.each(DUMMY_INPUT_CAR_NAMES)(
    '자동차 경주에 참여하는 자동차 이름은 쉼표(,)로 구분하여 입력한다.($input)',
    ({ input }) => {
      const cars = getCars(input);
      expect(() => {
        new CarRaceOrganizer(cars, DUMMY_INPUT_TOTAL_LAP);
      }).not.toThrow();
    }
  );

  test.each(DUMMY_INCORRECT_INPUT_CAR_NAMES)(
    '자동차 경주에 참여하는 자동차가 중복된다면 오류가 발생한다.',
    ({ input }) => {
      const cars = getCars(input);
      expect(() => {
        new CarRaceOrganizer(cars);
      }).toThrowError(ERROR_MESSAGE.DUPLICATE_CAR);
    }
  );

  test.each(DUMMY_RACE_SET)('자동차 주행 횟수마다 lap이 변경된다.', ({ input }) => {
    const cars = getCars(input);
    const carRaceOrganizer = new CarRaceOrganizer(cars, DUMMY_INPUT_TOTAL_LAP);
    expect(carRaceOrganizer.lap).toBe(0);
    carRaceOrganizer.runSingleRace();
    carRaceOrganizer.nextLap();
    expect(carRaceOrganizer.lap).toBe(1);
  });

  it('자동차 주행 횟수 마다 경주 상태를 출력한다.', () => {
    const logSpy = jest.spyOn(console, 'log');
    const cars = getCars(DUMMY_CARS);
    const carRaceOrganizer = new CarRaceOrganizer(cars, DUMMY_INPUT_TOTAL_LAP);
    carRaceOrganizer.runSingleRace();
    carRaceOrganizer.printRace();
    expect(logSpy).toHaveBeenCalledTimes(DUMMY_CARS.length);
    logSpy.mockClear();
  });

  test.each(DUMMY_RACE_TOTAL_LAPS)('자동차 경주 횟수는 숫자($inputTotalLap)만 취급한다.', ({ inputTotalLap }) => {
    const cars = getCars(DUMMY_CARS);
    expect(() => {
      new CarRaceOrganizer(cars, inputTotalLap);
    }).not.toThrowError();
  });
  test.each(DUMMY_INCORRECT_RACE_TOTAL_LAPS)(
    '자동차 경주 횟수가 양수가 아니면 오류가 발생한다.($inputTotalLap)',
    ({ inputTotalLap }) => {
      const cars = getCars(DUMMY_CARS);
      expect(() => {
        new CarRaceOrganizer(cars, inputTotalLap);
      }).toThrowError(ERROR_MESSAGE.INVALID_NUMBER);
    }
  );

  test.each(DUMMY_RACE_TOTAL_LAPS)(
    '입력된 자동차 경주 횟수($inputTotalLap)만큼 경주가 진행된다.',
    ({ inputTotalLap }) => {
      const cars = getCars(DUMMY_CARS);
      const carRaceOrganizer = new CarRaceOrganizer(cars, inputTotalLap);
      for (let lap = 0; lap < inputTotalLap; lap += 1) {
        expect(carRaceOrganizer.lap).toBe(lap);
        carRaceOrganizer.nextLap();
      }
      carRaceOrganizer.nextLap();
      expect(carRaceOrganizer.lap).toBe(inputTotalLap);
    }
  );

  it('자동차 경주 종료 후, 가장 많은 거리를 이동한 자동차가 우승한다.', () => {
    const cars = getCars(DUMMY_CARS);
    cars.map((car, index) => car.move(index + 1));
    const winners = getRaceWinners(cars);
    expect(winners).toHaveLength(1);
    expect(winners.pop()).toBe(cars.pop().name);
  });

  it('자동차 경주 종료 후, 최종 이동한 거리가 같다면 우승자는 여러 명이다.', () => {
    const cars = getCars(DUMMY_CARS);
    cars.map((car) => car.move(4));
    const winners = getRaceWinners(cars);
    expect(winners).toHaveLength(cars.length);
    expect(winners.pop()).toBe(cars.pop().name);
  });
});
