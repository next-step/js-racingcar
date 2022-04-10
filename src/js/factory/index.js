import { ERROR_MESSAGE, MAX_NAME_DIGITS, CONTROLL_KEY } from '../constants.js';
import {
  pipe,
  trim,
  trimComma,
  split,
  removeSpace,
  isDuplicatedArray,
  $disabled,
  $show,
  $focus,
} from '../helpers/index.js';

const checkValidations = carNames => {
  const checkedLength = carNames.filter(carName => {
    if (carName.length > MAX_NAME_DIGITS) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    return carName;
  });

  if (isDuplicatedArray(checkedLength)) throw new Error(ERROR_MESSAGE.NOT_ACCEPT_DUPLICATED);

  return checkedLength;
};

const executor = {
  [CONTROLL_KEY.CAR_NAMES]: pipe(trim, trimComma, split, removeSpace, checkValidations),
  [CONTROLL_KEY.CAR_NAMES_AFTER]: pipe(
    () => $show('#game-try-count-form'),
    () => $disabled('#car-names'),
    () => $disabled('#car-names-confirm'),
    () =>
      setTimeout(() => {
        $focus('#game-try-count');
      }, 100),
  ),
  [CONTROLL_KEY.TRY_COUNT_AFTER]: pipe(
    () => $disabled('#game-try-count'),
    () => $disabled('#game-try-count-confirm'),
  ),
  [CONTROLL_KEY.GAME_BEFORE]: pipe(split, carNames =>
    carNames.map(carName => ({ name: carName, moveCount: 0 })),
  ),
};

export const pipeline = (controllKey, params) => {
  try {
    const execute = executor[controllKey];
    return execute(params);
  } catch (error) {
    alert(error.message);
    return null;
  }
};
