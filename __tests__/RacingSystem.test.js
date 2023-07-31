import { MESSAGES, SETTINGS } from '../src/constants/index.js';
import { RacingSystem } from '../src/controller/RacingSystem.js';
import { GameSettings } from '../src/model/GameSettings.js';
import { getRandomNumber } from '../src/util/getRandomNumber.js';

describe('Racing System Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('if the input is valid', () => {
    test('should return an array of car names', () => {
      //given
      const input = `evan,perez,john`;
      const racingSystem = new RacingSystem(new GameSettings());
      racingSystem.startGame(input);

      // then
      const cars = racingSystem.cars;
      const MaxPosition = Math.max(...cars.map((car) => car.getPosition()));
      const winners = cars
        .filter((v) => v.getPosition() === MaxPosition)
        .map((car) => car.getName());
      expect(winners).toEqual(racingSystem.winners);
    });

    test('should be able to manage range of random Number', () => {});
  });

  describe('if the input is invalid', () => {
    const { NAME } = SETTINGS;
    const { ERROR } = MESSAGES;
    const racingSystem = new RacingSystem(new GameSettings());

    test('shoud be throw Error If Name is too Long', () => {
      // given
      const exceedName = 'a'.repeat(NAME.MAX_LENGTH + 1);

      // then
      expect(() => racingSystem.startGame(exceedName)).toThrowError(ERROR.MAX_NAME_LENGTH);
    });

    test('shoud be throw Error If Name is too Short', () => {
      // given
      const shortName = 'b'.repeat(NAME.MIN_LENGTH - 1);

      // then
      expect(() => racingSystem.startGame(shortName)).toThrowError(ERROR.MIN_NAME_LENGTH);
    });
  });

  describe('if setting has been updated', () => {
    test('should be able to control Round', () => {
      // given
      const input = `evan`;
      const TESTSETTINGS = new GameSettings();

      // @ts-ignore
      // when
      TESTSETTINGS.round = 1;
      const racingSystem = new RacingSystem(TESTSETTINGS);
      const logSpy = jest.spyOn(racingSystem.view, 'printBreakLine');
      racingSystem.startGame(input);

      // then
      const count = logSpy.mock.calls.length;
      expect(count).toBe(1);
    });

    test('should be able to manage range of random Number', () => {
      //given
      const RANGE_ONE = 1;
      const RANGE_TWO = 2;

      // then
      const randomNumber_ONE = getRandomNumber(RANGE_ONE, RANGE_ONE);
      const randomNumber_TWO = getRandomNumber(RANGE_TWO, RANGE_TWO);
      expect(randomNumber_ONE).toBe(RANGE_ONE);
      expect(randomNumber_TWO).toBe(RANGE_TWO);
    });

    test('should be able to move-condition', () => {
      // given
      const input = 'evan, perez, john';
      const TESTSETTINGS = new GameSettings();

      // @ts-ignore
      // when
      TESTSETTINGS.movementCondition = 0;
      const racingSystem = new RacingSystem(TESTSETTINGS);
      racingSystem.startGame(input);

      // then
      expect(racingSystem.cars.map((c) => c.getPosition())).toEqual([5, 5, 5]);
    });
  });
});
