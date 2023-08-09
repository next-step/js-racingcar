export const DUMMY_INPUT_TOTAL_LAP = 5;

export const DUMMY_CORRECT_CARS = [
  { name: 'mario', movableDistance: 4, notMovableDistance: 0 },
  { name: 'yoshi', movableDistance: 5, notMovableDistance: 1 },
  { name: 'koopa', movableDistance: 6, notMovableDistance: 2 },
  { name: 'peach', movableDistance: 7, notMovableDistance: 3 }
];

export const DUMMY_INCORRECT_CAR_NAMES = [{ name: '' }, { name: '  ' }, { name: ' ' }];

export const DUMMY_EXCEEDED_CAR_NAMES = [
  { name: 'yondo123' },
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
  { input: ['1', '2', '3', '4'] },
  { input: ['koopa', 'mario', 'yoshi', 'peach'] },
  { input: ['a', 'b', 'c', 'd'] }
];

export const DUMMY_INCORRECT_INPUT_CAR_NAMES = [
  { input: ['mario', 'mario', 'koopa', 'peach'] },
  { input: ['koopa', 'mario', 'koopa'] },
  { input: ['peach', 'peach'] }
];

export const DUMMY_RACE_SET = [
  { input: ['mario', 'yoshi', 'koopa', 'peach'] },
  { input: ['mario', 'yoshi', 'koopa'] },
  { input: ['peach', 'mario'] }
];

export const DUMMY_RACE_TOTAL_LAPS = [
  { inputTotalLap: 1 },
  { inputTotalLap: 100 },
  { inputTotalLap: 3 },
  { inputTotalLap: 77 },
  { inputTotalLap: 5 }
];

export const DUMMY_INCORRECT_RACE_TOTAL_LAPS = [
  { inputTotalLap: {} },
  { inputTotalLap: () => {} },
  { inputTotalLap: -1 },
  { inputTotalLap: NaN },
  { inputTotalLap: null },
  { inputTotalLap: 0 }
];

export const DUMMY_CARS = ['mario', 'yoshi', 'koopa', 'peach'];
