import { RacingSystem } from '../src/domain/controller/RacingSystem.js';
import { randomNumberGenerator } from '../src/util/index.js';

describe('Racing System Test', () => {
  const racingSystem = new RacingSystem();

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('if the input is valid', () => {
    it('should return an array of car names', () => {
      //given
      const INPUT = `evan,perez,john`;
      const ROUND = 3;
      racingSystem.startGame(INPUT, ROUND);

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

      // when
      racingSystem.startGame(input, ROUND);

      // then
      expect(racingSystem.round).toBe(ROUND);
    });

    it('should be able to manage range of random Number', () => {
      //given
      const RANGE_ONE = 1;
      const RANGE_TWO = 2;

      // then
      const NUMBER_ONE = randomNumberGenerator(RANGE_ONE, RANGE_ONE);
      const NUMBER_TWO = randomNumberGenerator(RANGE_TWO, RANGE_TWO);
      expect(NUMBER_ONE).toBe(RANGE_ONE);
      expect(NUMBER_TWO).toBe(RANGE_TWO);
    });
  });
});
