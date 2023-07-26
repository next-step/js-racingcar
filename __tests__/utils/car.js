import NumberMaker from '../../src/NumberMaker';
import { AVALIABLE_RANDOM_NUMBER } from '../../src/constants/index.js';

export const containsAllRacers = (str) => {
  const patterns = ['jiny', 'pobi', 'conan'];
  return patterns.every((pattern) => new RegExp(pattern).test(str));
};

export const containsAllStatus = (str) => {
  const patterns = ['jiny', 'pobi', 'conan', ':'];
  return patterns.every((pattern) => new RegExp(pattern).test(str));
};

export const isMove = (carName) => {
  const randomNumber = NumberMaker.createRandomNumber(carName);
  return randomNumber >= AVALIABLE_RANDOM_NUMBER;
};

export const createResultArray = (racingResult) =>
  racingResult
    .at(-1)
    .split('\n')
    .map((s) => {
      const [racer, distance] = [s.split(' : ')[0], s.split(' : ')[1].length];
      return [racer, distance];
    });

export const createMaxDistance = (result) => {
  const distanceArr = result.map(([, distance]) => distance);
  return Math.max(...distanceArr);
};

export const createRacingWinners = (racingResult) => {
  const result = createResultArray(racingResult);
  const maxDistance = createMaxDistance(result);
  return result
    .filter(([, distance]) => distance === maxDistance)
    .map(([racer]) => racer);
};
