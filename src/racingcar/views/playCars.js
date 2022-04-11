import { wait, WAIT_TIMES } from '../../utils';
import { $ } from '../../utils/dom';
import MakeCars from '../components/MakeCars';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_TRY_COUNT } from '../constatns/values';
import { NOT_ALLOWED_NAME_LENGTH, NOT_ALLOWED_TRY_COUNT } from '../constatns/messages';
import { splitAndTrim } from '../../utils/strings';
import carsStore from '../store/carsStore';
import { randomNumber } from '../../utils/randoms';

const $makeCars = $('#racingcar-make-cars');
const $tryCountSection = $('#racingcar-try-count-section');
const $namingInput = $('#racingcar-naming-input');

const $tryCountInput = $('#racingcar-try-count-input');

const $playCars = $('#racingcar-play-cars');
const $cars = $('#racingcar-cars');

const makeCarsEventListener = () => {
  $makeCars.addEventListener('click', handleMakeCarsClick);
  $makeCars.addEventListener('keyup', handleMakeCarsKeyup);
};

const handleMakeCarsClick = (e) => {
  if (e.target.id === 'racingcar-naming-button') {
    setCarNames();
  }

  if (e.target.id === 'racingcar-try-count-button') {
    setTryCounts();
  }
};

const handleMakeCarsKeyup = (e) => {
  if (e.target.id === 'racingcar-naming-input' && e.key === 'Enter') {
    setCarNames();
  }

  if (e.target.id === 'racingcar-try-count-input' && e.key === 'Enter') {
    setTryCounts();
  }
};

const setCarNames = () => {
  const carNames = splitAndTrim($namingInput.value);

  if (validateCarNames(carNames)) {

    carsStore.SET_CAR_NAMES(names);
  } else {
    alert(NOT_ALLOWED_NAME_LENGTH);
  }
};

const validateCarNames = (names) => {
  return names.every(
    (name) => MIN_NAME_LENGTH <= name.length && name.length <= MAX_NAME_LENGTH,
  );
};

const setTryCounts = () => {
  const tryCounts = $tryCountInput.value;

  if (validateTryCount(counts)) {
    $playCars.classList.remove('d-none');
    $tryCountInput.disabled = true;

    carsStore.SET_TRY_COUNTS(counts);

    playCars($cars);
  } else {
    alert(NOT_ALLOWED_TRY_COUNT);
  }
};

const validateTryCount = (tryCounts) => {
  return tryCounts >= MIN_TRY_COUNT;
};

const playCars = async ($target) => {
  carsStore.SET_CARS(carsStore.GET_CAR_NAMES());

  while (carsStore.GET_WINNERS().length === 0) {
    moveCar($target);
    await wait(WAIT_TIMES);
  }
};

const moveCar = ($target) => {
  carsStore.MOVE_CARS(randomNumber());
  carsStore.FIND_AND_SET_WINNERS();
  $target.replaceChildren(MakeCars(carsStore.GET_CARS()));
};

export { makeCarsEventListener, playCars };
