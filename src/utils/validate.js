import { CAR_LENGTH_RANGE_REGEX } from '../constants/index.js';

export const isInvalidLengthRacingCars = (racingCars) =>
  racingCars.some((carName) => !CAR_LENGTH_RANGE_REGEX.test(carName));

export const isDuplicateRacingCars = (racingCars) =>
  racingCars.length !== new Set(racingCars).size;
