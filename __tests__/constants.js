export const DUMMY_CORRECT_CARS = [
  { name: 'mario', movableDistance: 4, notMovableDistance: 0 },
  { name: 'yoshi', movableDistance: 5, notMovableDistance: 1 },
  { name: 'koopa', movableDistance: 6, notMovableDistance: 2 },
  { name: 'peach', movableDistance: 7, notMovableDistance: 3 }
];

export const DUMMY_INCORRECT_LENGTH_CARS = [
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

export const DUMMY_INPUT_CAR_NAMES = [{ input: 'car1,car2,car3,car4' }, { input: 'luigi,yoshi' }, { input: 'mario' }];

export const DUMMY_INCORRECT_INPUT_CAR_NAMES = [
  { input: 'racer,car,racer' },
  { input: 'car,car' },
  { input: 'car4,car3,car2,car2' }
];

export const DUMMY_RACE_SET = [
  { name: 'mario', moved: 1, move: () => {} },
  { name: 'yoshi', moved: 2, move: () => {} },
  { name: 'koopa', moved: 3, move: () => {} },
  { name: 'peach', moved: 4, move: () => {} }
];

export const DUMMY_DUPLICATE_WINNER_RACE_SET = [
  { name: 'mario', moved: 1 },
  { name: 'yoshi', moved: 2 },
  { name: 'koopa', moved: 3 },
  { name: 'peach', moved: 3 }
];
