import RacingCycleView from './RacingCycleView.js';
import AbstractView from './AbstractView.js';
import cars from '../utils/cars.js';

const CAR_NAME_SEPARATOR = ',';

const $carNameField = document.querySelector('#car-names-field');
const $carNamesSubmit = $carNameField.querySelector('#car-names-submit');
const $carNamesInput = $carNameField.querySelector('#car-names-input');

class IRacingCarNamesView extends AbstractView {
  #disabledCarNameField() {
    $carNameField.disabled = true;
  }

  #enabledCarNameField() {
    $carNameField.disabled = false;
  }

  #initializeCarName() {
    $carNamesInput.value = null;
  }

  #handleCarNameSubmit = () => {
    try {
      cars.validateNames(this.carNameList());
      this.#disabledCarNameField();
      RacingCycleView.showView();
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    }
  };

  carNameList = () => {
    return $carNamesInput.value.split(CAR_NAME_SEPARATOR);
  };

  eventBindings() {
    $carNamesSubmit.addEventListener('click', this.#handleCarNameSubmit);
  }

  initialize() {
    this.#initializeCarName();
    this.#enabledCarNameField();
  }
}
const RacingCarNamesView = new IRacingCarNamesView();
export default RacingCarNamesView;
