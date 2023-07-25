import { CAR_LENGTH_RANGE_REGEX } from '../constants/index.js';

export const isValidRacingCars = (racingCars) =>
  racingCars.every((carName) => CAR_LENGTH_RANGE_REGEX.test(carName));

export const isDuplicateRacingCars = (racingCars) =>
  racingCars.length !== new Set(racingCars).size;
