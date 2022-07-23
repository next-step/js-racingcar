import { isValidNumberOfCharacters } from './validation/index.js';
import { prepareRacingArea, showContent } from './view/index.js';
import { $formTryCount, $racingCar } from './selector.js';
import { getRandomIntInclusive, getIsForward } from './util/index.js';

const cars = [];

const updateCars = (carNameList) => {
  const newCars = carNameList.map((carName) => ({
    name: carName,
    step: 0,
  }));
  cars.push(...newCars);
};

export const handleWriteCarName = (event) => {
  event.preventDefault();

  const carNameValue = new FormData(event.target).get('car-name');
  const carNameValueList = carNameValue.split(',').map((text) => text.trim());
  if (!isValidNumberOfCharacters(carNameValueList)) {
    alert(
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    );
    return;
  }

  updateCars(carNameValueList);
  showContent($formTryCount);
  prepareRacingArea(carNameValueList);
};

export const handleWriteTryCount = (event) => {
  event.preventDefault();

  const tryCountValue = new FormData(event.target).get('try-count');

  for (let i = 0; i < tryCountValue; i++) {
    const arr = [];
    cars.forEach((car) => {
      const randomNumber = getRandomIntInclusive(0, 9);
      const isForward = getIsForward(randomNumber);
      if (isForward) {
        car.step += 1;
      }
      arr.push(isForward);
    });

    // appendEl(arr);
  }

  // appendRacingCarEl();
  showContent($racingCar);
};
