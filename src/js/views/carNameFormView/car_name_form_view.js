import View from '../view.js';
import { $ } from '../../utils.js';
import { ERROR_MESSAGE } from '../../const.js';
import { getTrimmedCarNames } from './utils.js';
import { validateCarNames } from './validators.js';

class CarNameFormView extends View {
  constructor($target, model) {
    super($target, model);
    this.$cardNameForm = $('#car-name-form');
    this.$carNameInput = $('#car-name-input');
    this.$carNameSubmitButton = $('#car-name-submit-button');
    this.carNames = '';
  }

  handleCardNameFormSubmit() {
    const nextCardNames = getTrimmedCarNames(this.carNames);

    if (validateCarNames(nextCardNames)) {
      this.model.setCarNames(nextCardNames);
      this.render();
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
      this.handleCardNameFormSubmit();
    }
  }
}

export default CarNameFormView;
