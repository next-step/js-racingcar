import { isValidNumberOfCharacters } from './validation/index.js';
import {
  appendRacingEl,
  prepareRacingArea,
  removeLoadingEl,
  setDisabledForm,
  showContent,
} from './view/index.js';
import { $formTryCount, $racingCar } from './selector.js';
import { getRandomIntInclusive, getIsForward } from './util/index.js';
import {
  getCars,
  createCars,
  updateCarStep,
  updateCars,
} from './model/cars.js';

export const handleWriteCarName = (event) => {
  event.preventDefault();

  const carName = new FormData(event.target).get('car-name');
  const carNameList = carName.split(',').map((text) => text.trim());
  if (!isValidNumberOfCharacters(carNameList)) {
    alert(
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    );
    return;
  }

  setDisabledForm(event.target);
  updateCars(createCars(carNameList));
  showContent($formTryCount);
  prepareRacingArea(carNameList);
};

const raceOneRound = () => {
  const resultOfOneCycle = getCars().map(() =>
    getIsForward(getRandomIntInclusive(0, 9))
  );

  getCars().forEach((car, i) => updateCarStep(car, resultOfOneCycle[i]));

  appendRacingEl(resultOfOneCycle);
};

const playRacing = (laps) => {
  [...Array(laps)].forEach(() => {
    raceOneRound();
  });
};

export const handleWriteTryCount = (event) => {
  event.preventDefault();

  const laps = new FormData(event.target).get('try-count');
  setDisabledForm(event.target);

  playRacing(laps);

  removeLoadingEl();
  showContent($racingCar);
};
