import { EventModel } from './EventModel.js';
import { Events, Messages } from '../constants.js';

export class CountInputModel extends EventModel {
  constructor(onComplete) {
    super();

    this.onComplete = onComplete;

    this.state = {
      input: '',
      inputDisabled: false,
      btnDisabled: false,
      isVisible: false,
    };

    this.listeners = {
      [Events.COUNT_INPUT_CHANGE]: [],
      [Events.COUNT_FIELD_VISIBLE]: [],
      [Events.COUNT_INPUT_DISABLED]: [],
      [Events.COUNT_BTN_DISABLED]: [],
    };

    this.bindEvents();
  }

  bindEvents() {
    this.state = this.bindEventToProperty(this.state, {
      input: (value) => {
        this.notify(Events.COUNT_INPUT_CHANGE, value);
      },
      isVisible: (value) => {
        this.notify(Events.COUNT_FIELD_VISIBLE, value);
      },
      inputDisabled: (value) => {
        this.notify(Events.COUNT_INPUT_DISABLED, value);
      },
      btnDisabled: (value) => {
        this.notify(Events.COUNT_BTN_DISABLED, value);
      },
    });
  }

  onChangeCount(e) {
    const { value } = e.target;
    this.state.countInput = +value ?? 0;
  }

  onClickCountBtn() {
    if (!this.state.countInput || this.state.countInput < 1) {
      alert(Messages.INVALID_COUNT);
      return;
    }

    this.state.inputDisabled = true;
    this.state.btnDisabled = true;
    this.onComplete(this.state.countInput);
  }

  onClickResetBtn() {
    this.state.input = '';
    this.state.inputDisabled = false;
    this.state.btnDisabled = false;
    this.state.isVisible = false;
  }
}
