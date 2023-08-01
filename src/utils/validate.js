import {
  CAR_LENGTH_RANGE_REGEX,
  CHARACTER_REGEX,
  INCLUDE_EMPTY_REGEX,
} from '../constants/index.js';

export const isInvalidLengthRacingCars = (racingCars) =>
  racingCars.some((carName) => !CAR_LENGTH_RANGE_REGEX.test(carName));

export const isDuplicateRacingCars = (racingCars) => racingCars.length !== new Set(racingCars).size;

export const isIncludeSpaces = (racingCars) =>
  racingCars.some((carName) => INCLUDE_EMPTY_REGEX.test(carName));

export const isCharacter = (racingCars) =>
  racingCars.every((carName) => CHARACTER_REGEX.test(carName));
