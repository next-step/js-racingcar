import { ERROR_MESSAGE } from '../src/constants/index';

export const DUMMY_CORRECT_CARS = [{ name: 'mario' }, { name: 'yoshi' }, { name: 'koopa' }, { name: 'peach' }];

export const DUMMY_INCORRECT_LENGTH_CARS_NAMES = [
  { name: '' },
  { name: 'JR.mario' },
  { name: 'donkeykong' },
  { name: 'JR.Koopa' },
  { name: 'sexyboy' }
];
export const DUMMY_NOT_STRING_CAR_NAMES = [
  { name: {} },
  { name: 1 },
  { name: undefined },
  { name: () => {} },
  { name: true }
];
