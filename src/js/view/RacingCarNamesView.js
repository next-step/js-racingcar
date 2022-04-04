import RacingCycleView from './RacingCycleView.js';

const MIN_CAR_NAME_LENGTH = 1;
const MAX_CAR_NAME_LENGTH = 5;
const CAR_NAME_SEPARATOR = ',';

const RacingCarNamesView = (function () {
  const $carNameField = document.querySelector('#car-names-field');
  const $carNamesSubmit = $carNameField.querySelector('#car-names-submit');
  const $carNamesInput = $carNameField.querySelector('#car-names-input');

  function notificationEmptyCarName() {
    alert('자동차 이름을 콤마로 구분하여 입력하세요.');
  }

  function notificationInvalidCarName() {
    alert('1자 이상 5자 이하의 자동차 이름을 입력하세요');
  }

  function isEmptyCarName(name) {
    return name === undefined || name === null || name.trim() === '';
  }

  function isValidCarName(name) {
    return (
      name.length >= MIN_CAR_NAME_LENGTH && name.length <= MAX_CAR_NAME_LENGTH
    );
  }

  function isExistEmptyCarName(carNames) {
    return carNames.some((carName) => isEmptyCarName(carName));
  }

  function isExistInvalidCarName(carNames) {
    return carNames.some((carName) => isValidCarName(carName) === false);
  }

  function disabledCarNameField() {
    $carNameField.disabled = true;
  }

  function carNameList() {
    return $carNamesInput.value.split(CAR_NAME_SEPARATOR);
  }

  function initialize() {
    $carNamesInput.value = null;
  }

  function handleCarNameSubmit() {
    if (isExistEmptyCarName(carNameList())) {
      notificationEmptyCarName();
      return;
    }

    if (isExistInvalidCarName(carNameList())) {
      notificationInvalidCarName();
      return;
    }

    disabledCarNameField();
    RacingCycleView.showView();
  }

  function eventBindings() {
    $carNamesSubmit.addEventListener('click', handleCarNameSubmit);
  }

  eventBindings();

  return {
    initialize,
    carNameList,
  };
})();
export default RacingCarNamesView;
