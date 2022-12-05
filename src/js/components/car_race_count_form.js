import { CAR, ERROR_MESSAGE } from '../const.js';
import { $ } from '../utils.js';
import Component from './component.js';

class CarRaceCountForm extends Component {
  constructor($target, model) {
    super($target, model);
    this.$carRaceCountForm = $('#car-race-count-form');
    this.$carRaceCountInput = $('#car-race-count-input');
    this.$carRaceCountSubmitButton = $('#car-race-count-submit-button');
    this.carRaceCount = 0;
  }

  validateCarRaceCount(nextCarRaceCount) {
    return nextCarRaceCount > CAR.RACE_COUNT.MIN;
  }

  handleCarRaceCountFormSubmit() {
    const { setCarRaceCount } = this.model;

    if (this.validateCarRaceCount(this.carRaceCount)) {
      setCarRaceCount(this.carRaceCount);
      return;
    }

    window.alert(ERROR_MESSAGE.INVALIDATE_CAR_RACE_COUNT);
  }

  handleChangeCarRaceCount(nextCarRaceCount) {
    this.carRaceCount = Number(nextCarRaceCount);
  }

  addChangeEvent(event) {
    const { target } = event;

    if (this.$carRaceCountInput.contains(target)) {
      this.handleChangeCarRaceCount(target.value);
    }
  }

  addSubmitEvent(event) {
    if (this.$carRaceCountForm.contains(event.target)) {
      event.preventDefault();
      this.handleCarRaceCountFormSubmit();
    }
  }

  renderCarRaceCountForm() {
    const { carRaceCount } = this.model;
    this.$carRaceCountForm.style.display = 'block';

    if (carRaceCount > 0) {
      this.$carRaceCountInput.disabled = true;
      this.$carRaceCountSubmitButton.disabled = true;
    }
  }

  render() {
    const { carNames } = this.model;
    const showCarRaceCountForm = carNames.length > 0;

    if (showCarRaceCountForm) {
      this.renderCarRaceCountForm();
    }
  }
}

export default CarRaceCountForm;
