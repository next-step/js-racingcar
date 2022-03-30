const carNamesInput = document.querySelector('#car-names-input');
const carNamesSubmit = document.querySelector('#car-names-submit');
const racingTryCount = document.querySelector('#racing-try-count');
const racingTrack = document.querySelector('#racing-track');
const racingResult = document.querySelector('#racing-result');
const tryCountInput = document.querySelector('#try-count-input');
const tryCountSubmit = document.querySelector('#try-count-submit');

racingTryCount.style.display = 'none';
racingTrack.style.display = 'none';
racingResult.style.display = 'none';

// * 자동차 이름 유효성 검증 함수
function isValidCarName(carName) {
  return carName.length < 1 || carName.length > 5;
}

// * 시도 횟수 입력창 보여주는 함수
function showRacingTryCount() {
  racingTryCount.style.display = 'block';
}

// * 자동차 이름 제출 함수
function submitCarNames() {
  const carNames = carNamesInput.value.split(',');

  // 자동차 이름 입력값 유효성 검사
  if (carNames.every(isValidCarName)) {
    alert('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
  }

  showRacingTryCount();
}

// * 시도 횟수 제출 함수
function submitTryCount() {
  if (isInvalidTryCount()) {
    alert('시도 횟수는 1번 이상, 10번 이하여야 합니다.');
  }

  // todo: 실행 내용
}

// * 시도 횟수 검증 함수
function isInvalidTryCount() {
  return tryCountInput.value < 1 || tryCountInput.value > 10;
}

carNamesSubmit.addEventListener('click', submitCarNames);
tryCountSubmit.addEventListener('click', submitTryCount);
