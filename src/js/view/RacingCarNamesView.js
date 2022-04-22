import RacingCycleView from './RacingCycleView.js';
import cars from '../utils/cars.js';

const CAR_NAME_SEPARATOR = ',';

const $carNameField = document.querySelector('#car-names-field');
const $carNamesInput = $carNameField.querySelector('#car-names-input');

const RacingCarNamesView = (function () {
  function carNameList() {
    return $carNamesInput.value.split(CAR_NAME_SEPARATOR);
  }

  function disabledCarNameField() {
    $carNameField.disabled = true;
  }

  function enabledCarNameField() {
    $carNameField.disabled = false;
  }

  function initializeCarName() {
    $carNamesInput.value = null;
  }

  function carNameSubmit() {
    try {
      cars.validateNames(carNameList());
      disabledCarNameField();
      RacingCycleView.showView();
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    }
  }

  function initialize() {
    initializeCarName();
    enabledCarNameField();
  }

  return { carNameSubmit, initialize, carNameList };
})();
export default RacingCarNamesView;
