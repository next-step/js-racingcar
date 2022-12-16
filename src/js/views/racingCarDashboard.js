const $racingCarDashboard = document.querySelector('#racingCarDashboard');

export const showRacingCarDashboard = (racingGameModel) => {
  $racingCarDashboard.style.display = 'flex';
  renderRacingCarContainer(racingGameModel);
};

const renderRacingCarContainer = (racingGameModel) => {
  const cars = racingGameModel.getCars();
  const racingCount = racingGameModel.getRacingCount();
  const racingCarsTemplate = /* html */ `${cars
    .map(({ name }) => `<div class="mr-2">${renderCarName(name)}</div>`)
    .join('')}`;
  $racingCarDashboard.insertAdjacentHTML('afterbegin', racingCarsTemplate);
  initRace({ cars, racingCount });
  renderCarMoves(cars);
};

const initRace = ({ cars, racingCount }) => {
  cars.forEach((carModel) => {
    carModel.setCarMoves(racingCount);
  });
};

export const renderCarMoves = (cars) => {
  cars.forEach((car) => {
    const carEl = document.querySelector(`#carName${car.name}`);
    car.moves.forEach((move) => {
      if (move) {
        carEl.insertAdjacentHTML('afterend', renderForwardArrow());
      } else {
        carEl.insertAdjacentHTML('afterend', renderLoadable());
      }
    });
  });
};

export const renderCarName = (carName) => {
  return `<div class="car-player" id="carName${carName}">${carName}</div>`;
};

export const renderForwardArrow = () => {
  return `<div class="forward-icon mt-2">⬇️️</div>`;
};

export const renderLoadable = () => {
  return /* html */ `<div class="d-flex justify-center mt-3">
                      <div class="relative spinner-container">
                        <span class="material spinner"></span>
                      </div>
                    </div>`;
};
