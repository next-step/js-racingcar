const carNamesSubmit = document.querySelector('#car-names-submit');

carNamesSubmit.addEventListener('click', e => {
  const carNamesInput = document.querySelector('#car-names-input');
  if (carNamesInput.value === '') {
    alert('자동차 이름을 입력해주세요.');
  }

  if (carNamesInput.value.length > 5) {
    alert('자동차 이름은 5글자까지만 가능합니다.');
  }
});

const racingTryCount = document.querySelector('#racing-try-count');
const racingTrack = document.querySelector('#racing-track');
const racingResult = document.querySelector('#racing-result');
racingTryCount.style.display = 'none';
racingTrack.style.display = 'none';
racingResult.style.display = 'none';
