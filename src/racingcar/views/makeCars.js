import { $ } from '../../utils/dom';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_TRY_COUNT } from '../constatns';
import { NOT_ALLOWED_NAME_LENGTH, NOT_ALLOWED_TRY_COUNT } from '../constatns/messages';

const $makeCars = $('#racingcar-make-cars');
const $tryCountSection = $('#racingcar-try-count-section');
const $namingInput = $('#racingcar-naming-input');

const $tryCountInput = $('#racingcar-try-count-input');

const $playCars = $('#racingcar-play-cars');

const makeCarsEventListener = () => {
  $makeCars.addEventListener('click', handleMakeCarsClick);
  $makeCars.addEventListener('keyup', handleMakeCarsKeyup);
};

const handleMakeCarsClick = (e) => {
  if (e.target.id === 'racingcar-naming-button') {
    validatingName();
  }

  if (e.target.id === 'racingcar-try-count-button') {
    validateTryCount();
  }
};

const handleMakeCarsKeyup = (e) => {
  if (e.target.id === 'racingcar-naming-input' && e.key === 'Enter') {
    validatingName();
  }

  if (e.target.id === 'racingcar-try-count-input' && e.key === 'Enter') {
    validateTryCount();
  }
};

const validatingName = () => {
  const names = $namingInput.value.split(',');
  const isValidName = validateNameLength(names);

  isValidName
    ? $tryCountSection.classList.remove('d-none')
    : alert(NOT_ALLOWED_NAME_LENGTH);
};

const validateNameLength = (names) => {
  return names.every(
    (name) => MIN_NAME_LENGTH <= name.length && name.length <= MAX_NAME_LENGTH,
  );
};

const validateTryCount = () => {
  const counts = $tryCountInput.value;

  counts >= MIN_TRY_COUNT
    ? $playCars.classList.remove('d-none')
    : alert(NOT_ALLOWED_TRY_COUNT);
};

export { makeCarsEventListener };
