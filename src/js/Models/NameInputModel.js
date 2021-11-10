import { EventModel } from './EventModel.js';
import { Events, Messages } from '../constants.js';

export class NameInputModel extends EventModel {
  constructor(onComplete) {
    super();

    this.onComplete = onComplete;

    this.state = {
      input: '',
      inputDisabled: false,
      btnDisabled: false,
    };

    this.listeners = {
      [Events.NAME_INPUT_DISABLED]: [],
      [Events.NAME_INPUT_CHANGE]: [],
    };

    this.bindEvents();
  }

  bindEvents() {
    this.state = this.bindEventToProperty(this.state, {
      input: (value) => {
        this.notify(Events.NAME_INPUT_CHANGE, value);
      },
      inputDisabled: (value) => {
        this.notify(Events.NAME_INPUT_DISABLED, value);
      },
      btnDisabled: (value) => {
        this.notify(Events.NAME_BTN_DISABLED, value);
      },
    });
  }

  onChangeName(e) {
    const { value } = e.target;
    this.state.input = value;
  }

  onClickNameBtn() {
    if (!this.state.input) {
      alert(Messages.EMPTY_NAME);
      return;
    }

    const names = this.state.input.split(',');
    const hasInvalidName = names.some((name) => !name || name.length > 5);

    if (hasInvalidName) {
      alert(Messages.INVALID_NAME);
      return;
    }

    this.state.inputDisabled = true;
    this.state.btnDisabled = true;
    this.onComplete(names);
  }

  onClickResetBtn() {
    this.state.input = '';
    this.state.inputDisabled = false;
    this.state.btnDisabled = false;
  }
}
