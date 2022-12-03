import { CAR, ERROR_MESSAGE } from '../const.js';
import { $ } from '../utils.js';
import View from './view.js';

class CarRaceCountFormView extends View {
  constructor($target, model) {
    super($target, model);
    this.$carRaceCountForm = $('#car-race-count-form');
    this.$carRaceCountInput = $('#car-race-count-input');
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
    const { carNames } = this.model;
    const showCarRaceCountForm = carNames.length > 0;

    if (showCarRaceCountForm) {
      this.$carRaceCountForm.style.display = 'block';
    }
  }

  render() {
    this.renderCarRaceCountForm();
  }
}

export default CarRaceCountFormView;
