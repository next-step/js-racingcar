import RacingCycleView from './RacingCycleView.js';
import CarNames from '../CarNames.js';

const CAR_NAME_SEPARATOR = ',';

const $carNameField = document.querySelector('#car-names-field');
const $carNamesSubmit = $carNameField.querySelector('#car-names-submit');
const $carNamesInput = $carNameField.querySelector('#car-names-input');

class RacingCarNamesView {
  static #disabledCarNameField() {
    $carNameField.disabled = true;
  }

  static #initializeCarName() {
    $carNamesInput.value = null;
  }

  static #handleCarNameSubmit() {
    if (CarNames.validate(RacingCarNamesView.carNameList())) {
      RacingCarNamesView.#disabledCarNameField();
      RacingCycleView.showView();
    }
  }

  static carNameList() {
    return $carNamesInput.value.split(CAR_NAME_SEPARATOR);
  }

  static eventBindings() {
    $carNamesSubmit.addEventListener(
      'click',
      RacingCarNamesView.#handleCarNameSubmit
    );
  }

  static initialize() {
    RacingCarNamesView.#initializeCarName();
  }
}
export default RacingCarNamesView;
