import RacingCycleView from './RacingCycleView.js';
import CarNames from '../CarNames.js';
import AbstractView from './AbstractView.js';

const CAR_NAME_SEPARATOR = ',';

const $carNameField = document.querySelector('#car-names-field');
const $carNamesSubmit = $carNameField.querySelector('#car-names-submit');
const $carNamesInput = $carNameField.querySelector('#car-names-input');

class RacingCarNamesView extends AbstractView {
  static #disabledCarNameField() {
    $carNameField.disabled = true;
  }

  static #enabledCarNameField() {
    $carNameField.disabled = false;
  }

  static #initializeCarName() {
    $carNamesInput.value = null;
  }

  static #handleCarNameSubmit() {
    try {
      CarNames.validate(RacingCarNamesView.carNameList());
      RacingCarNamesView.#disabledCarNameField();
      RacingCycleView.showView();
    } catch (e) {
      alert(e.message);
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
    RacingCarNamesView.#enabledCarNameField();
  }
}
export default RacingCarNamesView;
