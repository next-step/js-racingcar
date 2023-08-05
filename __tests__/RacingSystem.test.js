import { MESSAGES, SETTINGS } from '../src/constants/index.js';
import { RacingSystem } from '../src/controller/RacingSystem.js';
import { GameSettings } from '../src/model/GameSettings.js';
import { getRandomNumber } from '../src/util/getRandomNumber.js';

describe('Racing System Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('if the input is valid', () => {
    it('should return an array of car names', () => {
      //given
      const input = `evan,perez,john`;
      const racingSystem = new RacingSystem(new GameSettings());
      racingSystem.startGame(input);

      // then
      const cars = racingSystem.cars;
      const MAX_POSITION = Math.max(...cars.map((car) => car.getPosition()));
      const winners = cars
        .filter((v) => v.getPosition() === MAX_POSITION)
        .map((car) => car.getName());
      expect(winners).toEqual(racingSystem.winners);
    });

    it('should be able to manage range of random Number', () => {});
  });

  describe('if the input is invalid', () => {
    const { NAME } = SETTINGS;
    const { ERROR } = MESSAGES;
    const racingSystem = new RacingSystem(new GameSettings());

    it('shoud be throw Error If Name is too Long', () => {
      // given
      const exceedName = 'a'.repeat(NAME.MAX_LENGTH + 1);

      // then
      expect(() => racingSystem.startGame(exceedName)).toThrowError(ERROR.MAX_NAME_LENGTH);
    });

    it('shoud be throw Error If Name is too Short', () => {
      // given
      const shortName = 'b'.repeat(NAME.MIN_LENGTH - 1);

      // then
      expect(() => racingSystem.startGame(shortName)).toThrowError(ERROR.MIN_NAME_LENGTH);
    });
  });

  describe('if setting has been updated', () => {
    it('should be able to control Round', () => {
      // given
      const input = `evan`;
      const TEST_SETTINGS = new GameSettings();

      // @ts-ignore
      // when
      TEST_SETTINGS.round = 1;
      const racingSystem = new RacingSystem(TEST_SETTINGS);
      const logSpy = jest.spyOn(racingSystem.view, 'printBreakLine');
      racingSystem.startGame(input);

      // then
      const count = logSpy.mock.calls.length;
      expect(count).toBe(1);
    });

    it('should be able to manage range of random Number', () => {
      //given
      const RANGE_ONE = 1;
      const RANGE_TWO = 2;

      // then
      const NUMBER_ONE = getRandomNumber(RANGE_ONE, RANGE_ONE);
      const NUMBER_TWO = getRandomNumber(RANGE_TWO, RANGE_TWO);
      expect(NUMBER_ONE).toBe(RANGE_ONE);
      expect(NUMBER_TWO).toBe(RANGE_TWO);
    });

    it('should be able to move-condition', () => {
      // given
      const input = 'evan, perez, john';
      const TEST_SETTINGS = new GameSettings();

      // @ts-ignore
      // when
      TEST_SETTINGS.movementCondition = 0;
      const racingSystem = new RacingSystem(TEST_SETTINGS);
      racingSystem.startGame(input);

      // then
      expect(racingSystem.cars.map((c) => c.getPosition())).toEqual([5, 5, 5]);
    });
  });
});