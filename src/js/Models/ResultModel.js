import { EventModel } from './EventModel.js';
import { Events, Messages } from '../constants.js';

export class ResultModel extends EventModel {
  constructor() {
    super();

    this.state = {
      winners: [],
      isVisible: false,
    };

    this.listeners = {
      [Events.RESULT_SECTION_VISIBLE]: [],
      [Events.WINNERS_CHANGE]: [],
    };

    this.bindEvents();
  }

  bindEvents() {
    this.state = this.bindEventToProperty(this.state, {
      isVisible: (value) => {
        this.notify(Events.RESULT_SECTION_VISIBLE, value);
      },
      winners: (value) => {
        this.notify(Events.WINNERS_CHANGE, value);
      },
    });
  }

  showAlert() {
    setTimeout(() => alert(Messages.END), 2000);
  }

  onClickResetBtn() {
    this.state.isVisible = false;
  }
}
