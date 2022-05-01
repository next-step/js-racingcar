import TEMPLATE from '../constants/template.js';
import { $ } from '../utils/selector.js';

export const renderRacingCar = (racingCarList) => {
  $('#racing-progress-section').innerHTML = TEMPLATE.RACING_PROGRESS_VIEW;
  disableInputOfAttemptCount();

  racingCarList.carList.forEach((car) => {
    createRacingCar(car.carName);
  });
};

const disableInputOfAttemptCount = () => {
  $('#attempt-count-input').disabled = true;
  $('#attempt-count-submit').disabled = true;
};

export const resetAttemptInput = () => {
  $('#attempt-count-input').value = null;
};

export const createRacingCar = (carName) => {
  const carWrapper = document.createElement('div');
  const carElement = document.createElement('div');

  carWrapper.className = 'mr-2 car';
  carElement.className = 'car-player';
  carElement.innerText = carName;
  carElement.id = carName;

  carWrapper.appendChild(carElement);
  $('.racing-container').append(carWrapper);
};

export const renderForwardIcon = (parent) => {
  const forwardIcon = document.createElement('div');

  forwardIcon.className = 'forward-icon mt-2';
  forwardIcon.innerText = '⬇️️';

  parent.insertAdjacentElement('beforeend', forwardIcon);
};

export const renderLoadingIconOfCar = () => {
  const carElements = document.getElementsByClassName('car');
  [...carElements].forEach((carElem, idx) => {
    renderLoadingIcon(carElem);
  });
};

export const removeLoadingIconOfCar = () => {
  const carElements = document.getElementsByClassName('car');
  [...carElements].forEach((carElem, idx) => {
    removePrevSpinner(carElem);
  });
};

export const renderLoadingIcon = (parent) => {
  const spinnerFlexContainer = document.createElement('div');
  const spinnerContainer = document.createElement('div');
  const spinnerIcon = document.createElement('span');

  spinnerFlexContainer.className = 'd-flex justify-center mt-3 spinner-wrapper';
  spinnerContainer.className = 'relative spinner-container';
  spinnerIcon.className = 'material spinner';

  spinnerContainer.appendChild(spinnerIcon);
  spinnerFlexContainer.appendChild(spinnerContainer);

  parent.insertAdjacentElement('beforeend', spinnerFlexContainer);
};

export const renderRacingIcon = (carRacingProperty) => {
  const carElements = document.getElementsByClassName('car');

  [...carElements].forEach((carElem, idx) => {
    if (carRacingProperty[idx].isForward) {
      removePrevSpinner(carElem);
      renderForwardIcon(carElem);
      renderLoadingIcon(carElem);
    }
  });
};

export const removePrevSpinner = (currentElement) => {
  const lastElement = currentElement.lastChild;

  if (lastElement.className.includes('spinner-wrapper')) {
    currentElement.removeChild(lastElement);
  }
};

export const renderGameResult = (winnerList) => {
  const winners = [];
  winnerList.map((winner) => {
    winners.push(winner.carName);
  });

  const winnerElement = $('#winners');
  winnerElement.innerHTML = winners.join(', ');

  $('#racing-winner-section').style.display = 'block';
};

export const alertWinners = () => {
  alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇');
};
