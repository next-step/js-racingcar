import { templateRaceLapFieldset } from './template.js';

const $carNameSubmit = document.querySelector('#car-name-submit');

function createRaceLapFieldset() {
  const $div = document.createElement('div');
  $div.innerHTML = templateRaceLapFieldset();

  const $form = document.querySelector('#racingcar-form');
  $form.appendChild($div.firstElementChild);
}

$carNameSubmit.addEventListener('click', () => {
  const $carNameInput = document.querySelector('#car-name-input');
  const value = $carNameInput.value.trim();
  const carNames = value.split(',');
  const regexp = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣,]+$/g; // TODO: 변수 이름 변경

  if (!value) {
    alert('자동차 이름을 입력해주세요.');
    return;
  }

  if (!regexp.test(value)) {
    alert('자동차 이름은 영문, 한글, 쉼표만 입력할 수 있습니다');
    return;
  }

  if (carNames.find((carName) => carName.length > 5)) {
    alert('자동차 이름은 쉼표를 기준으로 5자 이하만 가능합니다.');
    return;
  }

  createRaceLapFieldset();
});
