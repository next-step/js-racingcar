import { ERROR_MESSAGE } from '../src/constants/index';

export const DUMMY_CORRECT_CARS = [
  { name: 'mario' },
  { name: 'yoshi' },
  { name: 'koopa' },
  { name: 'peach' }
];

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

export const DUMMY_INPUT_CAR_NAMES = [
  { input: 'car1,car2,car3,car4' },
  { input: 'luigi,yoshi' },
  { input: 'mario' }
];

export const DUMMY_INCORRECT_INPUT_CAR_NAMES = [
  { input: 'racer,car,racer' },
  { input: 'car,car' },
  { input: 'car4,car3,car2,car2' }
];
