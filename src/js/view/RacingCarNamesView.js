import RacingCycleView from './RacingCycleView.js';
import CarNames from '../CarNames.js';

const CAR_NAME_SEPARATOR = ',';

const RacingCarNamesView = (function () {
  const $carNameField = document.querySelector('#car-names-field');
  const $carNamesSubmit = $carNameField.querySelector('#car-names-submit');
  const $carNamesInput = $carNameField.querySelector('#car-names-input');

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
    if (CarNames.validate(carNameList())) {
      disabledCarNameField();
      RacingCycleView.showView();
    }
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
