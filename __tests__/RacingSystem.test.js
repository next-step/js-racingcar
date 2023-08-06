import { RacingSystem } from '../src/controller/RacingSystem.js';
import { getRandomNumber } from '../src/util/getRandomNumber.js';

describe('Racing System Test', () => {
  const racingSystem = new RacingSystem();

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('if the input is valid', () => {
    it('should return an array of car names', () => {
      //given
      const input = `evan,perez,john`;
      racingSystem.startGame(input);

      // then
      const cars = racingSystem.cars;
      const MAX_POSITION = Math.max(...cars.map((car) => car.getPosition()));
      const winners = cars
        .filter((v) => v.getPosition() === MAX_POSITION)
        .map((car) => car.getName());
      expect(winners).toEqual(racingSystem.winners);
    });
  });

  describe('if setting has been updated', () => {
    it('should be able to control Round', () => {
      // given
      const input = `evan`;
      const ROUND = 3;

      // @ts-ignore
      // when
      const logSpy = jest.spyOn(racingSystem.view, 'printBreakLine');
      racingSystem.startGame(input, ROUND);

      // then
      const count = logSpy.mock.calls.length;
      expect(count).toBe(ROUND);
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
  });
});
