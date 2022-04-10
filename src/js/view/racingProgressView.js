import { htmlTemplate } from '../constants/template.js';
import { $ } from '../utils/selector.js';

export const renderRacingCar = (racingCarList) => {
  $('#racing-progress-section').innerHTML = htmlTemplate.racingProgressView;
  $('#attempt-count-input').disabled = true;
  $('#attempt-count-submit').disabled = true;

  racingCarList.carList.forEach((car) => {
    createRacingCar(car.carName);
  });
};

export const resetAttemptInput = () => {
  $('#attempt-count-input').value = null;
};

export const createRacingCar = (carName) => {
  const carWrapper = document.createElement('div');
  carWrapper.className = 'mr-2 car';

  const carElement = document.createElement('div');
  carElement.className = 'car-player';
  carElement.innerText = carName;

  carWrapper.appendChild(carElement);
  $('.racing-container').append(carWrapper);
};

export const renderForwardIcon = (parent) => {
  const forwardIcon = document.createElement('div');
  forwardIcon.className = 'forward-icon mt-2';
  forwardIcon.innerText = '⬇️️';

  parent.insertAdjacentElement('beforeend', forwardIcon);
};
export const renderLoadingIcon = (parent) => {
  const spinnerFlexContainer = document.createElement('div');
  spinnerFlexContainer.className = 'd-flex justify-center mt-3 spinner-wrapper';
  const spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'relative spinner-container';
  const spinnerIcon = document.createElement('span');
  spinnerIcon.className = 'material spinner';

  spinnerContainer.appendChild(spinnerIcon);
  spinnerFlexContainer.appendChild(spinnerContainer);

  parent.insertAdjacentElement('beforeend', spinnerFlexContainer);
};

export const startRacing = (carDtos) => {
  const carElements = document.getElementsByClassName('car');

  [...carElements].forEach((carElem, idx) => {
    removePrevSpinner(carElem);
    if (carDtos[idx].isForward) {
      renderForwardIcon(carElem);
    } else {
      renderLoadingIcon(carElem);
    }
  });
};

export const removePrevSpinner = (currentElement) => {
  const lastElement = currentElement.lastChild;

  if (lastElement.className.includes('spinner-wrapper')) {
    lastElement.remove();
  }
};
