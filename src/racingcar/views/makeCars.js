import { $ } from '../../utils/dom';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from '../constatns';
import { NOT_ALLOWED_NAME_LENGTH } from '../constatns/messages';

const $makeCars = $('#racingcar-make-cars');
const $tryCountSection = $('#racingcar-try-count-section');
const $namingInput = $('#racingcar-naming-input');

const makeCarsEventListener = () => {
  $makeCars.addEventListener('click', handleMakeCarsClick);
  $makeCars.addEventListener('keyup', handleMakeCarsKeyup);
};

const handleMakeCarsClick = (e) => {
  if (e.target.id === 'racingcar-naming-button') {
    validatingName();
  }
};

const handleMakeCarsKeyup = (e) => {
  if (e.target.id === 'racingcar-naming-input' && e.key === 'Enter') {
    validatingName();
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

export { makeCarsEventListener };
