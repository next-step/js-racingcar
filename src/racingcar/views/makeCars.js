import { wait } from '../../utils';
import { $ } from '../../utils/dom';
import Cars from '../components/Cars';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_TRY_COUNT } from '../constatns';
import { NOT_ALLOWED_NAME_LENGTH, NOT_ALLOWED_TRY_COUNT } from '../constatns/messages';
import carsStore from '../store/cars';

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
  const names = $namingInput.value.split(',').map((name) => name.trim());

  if (validateName(names)) {
    $tryCountSection.classList.remove('d-none');
    carsStore.SET_CAR_NAMES(names);
  } else {
    alert(NOT_ALLOWED_NAME_LENGTH);
  }
};

const validateName = (names) => {
  return names.every(
    (name) => MIN_NAME_LENGTH <= name.length && name.length <= MAX_NAME_LENGTH,
  );
};

const setTryCounts = () => {
  const counts = $tryCountInput.value;

  if (validateTryCount(counts)) {
    $playCars.classList.remove('d-none');
    carsStore.SET_TRY_COUNTS(counts);

    playCars();
  } else {
    alert(NOT_ALLOWED_TRY_COUNT);
  }
};

const validateTryCount = (counts) => {
  return counts >= MIN_TRY_COUNT;
};

const playCars = async () => {
  carsStore.SET_CARS(carsStore.GET_CAR_NAMES());

  while (carsStore.GET_WINNERS().length === 0) {
    carsStore.MOVE_CARS();
    carsStore.FIND_AND_SET_WINNERS();
    $cars.replaceChildren(Cars(carsStore.GET_CARS()));

    await wait(500);
  }
};

export { makeCarsEventListener };
