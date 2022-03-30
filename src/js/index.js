const carNamesSubmit = document.querySelector('#car-names-submit');
const racingTryCount = document.querySelector('#racing-try-count');
const racingTrack = document.querySelector('#racing-track');
const racingResult = document.querySelector('#racing-result');

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
  const carNames = document.querySelector('#car-names-input').value.split(',');

  // 자동차 이름 입력값 유효성 검사
  if (carNames.every(isValidCarName)) {
    alert('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
  }

  showRacingTryCount();
}

carNamesSubmit.addEventListener('click', submitCarNames);
