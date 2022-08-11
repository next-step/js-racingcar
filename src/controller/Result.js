import BaseController from './BaseController.js';
import BaseInput from './BaseInput.js';

export default class Result extends BaseController {
  constructor(app) {
    super(app);

    this.$restartButton = document.querySelector('#btn-restart');

    this.#addRestartButtonEvent();
  }

  #addRestartButtonEvent() {
    this.$restartButton.addEventListener('click', this.#restart.bind(this));
  }

  #restart() {
    this.model.resetState();
    BaseInput.Clear();
  }
}
