import Component from './component.js';
import { $ } from '../utils.js';
import { CAR, ERROR_MESSAGE } from '../const.js';

class CarNameForm extends Component {
  constructor($target, model) {
    super($target, model);
    this.$cardNameForm = $('#car-name-form');
    this.$carNameInput = $('#car-name-input');
    this.$carNameSubmitButton = $('#car-name-submit-button');
    this.carNames = '';
  }

  getTrimmedCarNames(nextCardNames) {
    return nextCardNames.replace(/ /g, '').split(CAR.SEPARATOR);
  }

  validateCarName(nextCarName) {
    return (
      nextCarName.length > CAR.NAME.MIN_LENGTH &&
      nextCarName.length <= CAR.NAME.MAX_LENGTH
    );
  }

  validateCarNames(nextCardNames) {
    const validatedCarNames = nextCardNames.filter((carName) =>
      this.validateCarName(carName)
    );

    return validatedCarNames.length === nextCardNames.length;
  }

  handleCarNameFormSubmit() {
    const { setCarNames } = this.model;
    const nextCardNames = this.getTrimmedCarNames(this.carNames);

    if (this.validateCarNames(nextCardNames)) {
      setCarNames(nextCardNames);
      return;
    }

    window.alert(ERROR_MESSAGE.INVALIDATE_CAR_NAME);
  }

  handleCarNamesChange(nextCarNames) {
    this.carNames = nextCarNames;
  }

  addChangeEvent(event) {
    const { target } = event;

    if (this.$carNameInput.contains(target)) {
      this.handleCarNamesChange(target.value);
    }
  }

  addSubmitEvent(event) {
    if (this.$cardNameForm.contains(event.target)) {
      event.preventDefault();
      this.handleCarNameFormSubmit();
    }
  }

  render() {
    const { carNames } = this.model;

    if (carNames.length > 0) {
      this.$carNameInput.disabled = true;
      this.$carNameSubmitButton.disabled = true;
    }
  }
}

export default CarNameForm;
