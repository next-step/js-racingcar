import RacingGameModel from '../models/RacingGameModel.js';

const $racingCarDashboard = document.querySelector('#racingCarDashboard');

export const showRacingCarDashboard = () => {
  $racingCarDashboard.style.display = 'flex';
  renderRacingCarContainer();
};

const renderRacingCarContainer = () => {
  const cars = RacingGameModel.getCars();
  const racingCarsTemplate = /* html */ `${cars
    .map(({ name }) => `<div class="mr-2">${renderCarName(name)}</div>`)
    .join('')}`;

  $racingCarDashboard.insertAdjacentHTML('afterbegin', racingCarsTemplate);
};

export const renderCarName = (carName) => {
  return `<div class="car-player" id="${carName}">${carName}</div>`;
};
