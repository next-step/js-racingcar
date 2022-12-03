import View from './view.js';
import { $ } from '../utils.js';

class CarNameFormView extends View {
  constructor($target, model) {
    super($target, model);
    this.$cardNameForm = $('#card-name-form');
    this.$carNameInput = $('#card-name-input');
    this.$carNameSubmitButton = $('#card-name-submit-button');
    this.carNames = '';
  }

  validateCarName(nextCarName) {
    return nextCarName.length > 0 && nextCarName.length <= 5;
  }

  validateCarNames(nextCardNames) {
    const validatedCarNames = nextCardNames.filter((carName) =>
      this.validateCarName(carName)
    );

    return validatedCarNames.length === nextCardNames.length;
  }

  handleCardNameFormSubmit() {
    const nextCardNames = this.carNames.replace(/ /g, '').split(',');

    if (this.validateCarNames(nextCardNames)) {
      this.model.setCarNames(nextCardNames);
      this.render();
      return;
    }

    window.alert('');
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
      this.handleCardNameFormSubmit();
    }
  }

  render() {}
}

export default CarNameFormView;
