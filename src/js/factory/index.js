import { CONTROLL_KEY } from '../constants.js';
import {
  pipe,
  trim,
  trimComma,
  split,
  removeSpace,
  $show,
  $focus,
  $disabled,
} from '../helpers/index.js';
import { checkValidations, racingWrapper, renderResetArea } from './service.js';

// prettier-ignore
const executor = {
  [CONTROLL_KEY.CAR_NAMES]: pipe(
    trim,
    trimComma,
    split,
    removeSpace,
    checkValidations,
  ),
  [CONTROLL_KEY.CAR_NAMES_AFTER]: pipe(
    () => $show('#game-try-count-form'),
    () => $disabled('#car-names'),
    () => $disabled('#car-names-confirm'),
    () => setTimeout(() => $focus('#game-try-count'), 100),
  ),
  [CONTROLL_KEY.TRY_COUNT_AFTER]: pipe(
    () => $disabled('#game-try-count'),
    () => $disabled('#game-try-count-confirm'),
  ),
  [CONTROLL_KEY.GAME_BEFORE]: pipe(
    split,
    carNames => carNames.map(carName => ({ name: carName, moveCount: 0 })),
  ),
  [CONTROLL_KEY.GAME]: pipe(
    racingWrapper,
    window.requestAnimationFrame,
  ),
  [CONTROLL_KEY.RESULT]: pipe(
    trimComma,
    renderResetArea,
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
