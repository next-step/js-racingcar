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

racingTryCount.style.display = 'none';
racingTrack.style.display = 'none';
racingResult.style.display = 'none';

const cars = {
  carNames: [],
};

let tryCount = 0;

const moveForwardTemplate =
  /* HTML */
  `<div class="forward-icon mt-2">⬇️️</div>`;

const loadingTemplate =
  /* HTML */
  `<div class="draw-random-number">
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </div>`;

function showRacingTryCount() {
  racingTryCount.style.display = '';
}

function showRacingTrack() {
  racingTrack.style.display = '';
}

function renderRacingCars(carNames) {
  const racingCarTemplates = [];

  carNames.forEach(carName => {
    racingCarTemplates.push(
      /* HTML */
      `
        <div class="mr-2 racing-car" id=${carName}>
          <div class="car-player">${carName}</div>
        </div>
      `
    );
  });

  racingTrack.firstElementChild.innerHTML = racingCarTemplates.join('');

  showRacingTrack();
}

function renderLoading(car) {
  document.querySelector(`#${car}`).insertAdjacentHTML('beforeend', loadingTemplate);
}

function removeLoading(car) {
  const carElement = document.querySelector(`#${car}`);
  carElement.removeChild(carElement.lastElementChild);
}

function renderMoveForward(car) {
  document.querySelector(`#${car}`).insertAdjacentHTML('beforeend', moveForwardTemplate);
}

function getRandomNumber() {
  return Math.random() * 10;
}

function isMoveForwardNumber(randomNumber) {
  return randomNumber >= MOVE_FORWARD_MIN_NUMBER && randomNumber <= MOVE_FORWARD_MAX_NUMBER;
}

function startRace() {
  const carNames = ['CHILL'];
  renderRacingCars(carNames);
  /*
   * 1. 로딩 화면을 1초간 보여준다.
   * 2.
   *  - 전진이면 로딩 화면을 삭제하고 화살표를 그린다.
   *  - 정지면 로딩 화면을 삭제한다.
   *
   * 3. 1 ~ 2단계를 시도 횟수만큼 반복한다.
   */
  const car = 'CHILL';
  let count = 1;

  const timeIntervalId = setInterval(() => {
    console.log(`count: ${count}, tryCount: ${tryCount}`);
    renderLoading(car);

    setTimeout(() => {
      removeLoading(car);
      if (isMoveForwardNumber(getRandomNumber())) {
        renderMoveForward(car);
      }
    }, 1000);

    count += 1;
    if (count > tryCount) clearInterval(timeIntervalId);
  }, 1000);
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
