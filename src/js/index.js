import { isValidNumberOfCharacters } from './validation/index.js';
import { showContent } from './view/index.js';

const $formCarName = document.querySelector('#form-car-name');
const $formTryCount = document.querySelector('#form-try-count');

const handleSubmitCarName = (event) => {
  event.preventDefault();

  const carNameValue = new FormData(event.target).get('car-name');
  const carNames = carNameValue.split(',').map((text) => text.trim());

  if (!isValidNumberOfCharacters(carNames)) {
    alert(
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    );
    return;
  }

  showContent($formTryCount);
};

$formCarName.addEventListener('submit', handleSubmitCarName);
