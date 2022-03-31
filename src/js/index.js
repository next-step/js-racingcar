const carNamesInput = document.querySelector('#car-names-input');
const carNamesSubmit = document.querySelector('#car-names-submit');
const racingTryCount = document.querySelector('#racing-try-count');
const racingTrack = document.querySelector('#racing-track');
const racingResult = document.querySelector('#racing-result');
const tryCountInput = document.querySelector('#try-count-input');
const tryCountSubmit = document.querySelector('#try-count-submit');

const CAR_NAME_MIN_LENGTH = 1;
const CAR_NAME_MAX_LENGTH = 5;
const TRY_COUNT_MIN_VALUE = 1;
const TRY_COUNT_MAX_VALUE = 10;
const MOVE_FORWARD_MIN_NUMBER = 4;
const MOVE_FORWARD_MAX_NUMBER = 9;
const RANDOM_NUMBER_MAX_VALUE = 10;
const MILLISECONDS_PER_TRY = 1000;
const INITIAL_TRY_COUNT = 1;
const INCREMENT_PER_TRY = 1;

racingTryCount.style.display = 'none';
racingTrack.style.display = 'none';
racingResult.style.display = 'none';

const cars = {
  carNames: [],
};

let tryCount = INITIAL_TRY_COUNT;

const moveForwardTemplate =
  /* HTML */
  `<div class="forward-icon mt-2">⬇️️</div>`;

const racingCarTemplate = carName => /* HTML */ `
  <div class="mr-2 racing-car">
    <div class="car-player" id=${carName}>${carName}</div>

    <div class="draw-random-number">
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    </div>
  </div>
`;

function showRacingTryCount() {
  racingTryCount.style.display = '';
}

function showRacingTrack() {
  racingTrack.style.display = '';
}

function renderRacingCars(carNames) {
  const racingCarTemplates = [];

  carNames.forEach(carName => {
    racingCarTemplates.push(racingCarTemplate(carName));
  });

  racingTrack.firstElementChild.innerHTML = racingCarTemplates.join('');

  showRacingTrack();
}

function renderLoading() {
  document.querySelectorAll('.draw-random-number').forEach(element => {
    element.style.display = '';
  });
}

function removeLoading() {
  document.querySelectorAll('.draw-random-number').forEach(element => {
    element.style.display = 'none';
  });
}

function renderMoveForward(car) {
  document.querySelector(`#${car}`).insertAdjacentHTML('afterend', moveForwardTemplate);
}

function getRandomNumber() {
  return Math.random() * RANDOM_NUMBER_MAX_VALUE;
}

function isMoveForwardNumber(randomNumber) {
  return randomNumber >= MOVE_FORWARD_MIN_NUMBER && randomNumber <= MOVE_FORWARD_MAX_NUMBER;
}

function startRace() {
  renderRacingCars(cars.carNames);

  let count = INITIAL_TRY_COUNT;

  const timeIntervalId = setInterval(() => {
    renderLoading();

    cars.carNames.forEach(car => {
      if (isMoveForwardNumber(getRandomNumber())) {
        renderMoveForward(car);
      }
    });

    count += INCREMENT_PER_TRY;

    if (count > tryCount) {
      removeLoading();
      clearInterval(timeIntervalId);
    }
  }, MILLISECONDS_PER_TRY);
}

function isValidCarName(carName) {
  return carName.length < CAR_NAME_MIN_LENGTH || carName.length > CAR_NAME_MAX_LENGTH;
}

function isInvalidTryCount() {
  return tryCountInput.value < TRY_COUNT_MIN_VALUE || tryCountInput.value > TRY_COUNT_MAX_VALUE;
}

function submitCarNames() {
  const carNames = carNamesInput.value.split(',');

  if (carNames.every(isValidCarName)) {
    alert('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
  }

  cars.carNames = carNames;

  showRacingTryCount();
}

function submitTryCount() {
  if (isInvalidTryCount()) {
    alert('시도 횟수는 1번 이상, 10번 이하여야 합니다.');
    return;
  }

  tryCount = tryCountInput.value;

  startRace();
}

carNamesSubmit.addEventListener('click', submitCarNames);
tryCountSubmit.addEventListener('click', submitTryCount);
