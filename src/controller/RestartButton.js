import BaseController from './BaseController.js';
import BaseInput from './BaseInput.js';

export default class RestartButton extends BaseController {
  constructor(app) {
    super(app);

    this.$restartButton = document.querySelector('#btn-restart');
    this.$inputAttempt = document.querySelector('#input-attempt');
    this.$inputCarPlayerName = document.querySelector('#input-car-player-name');

    this.#addRestartButtonEvent();
  }

  #addRestartButtonEvent() {
    this.$restartButton.addEventListener('click', this.#restart.bind(this));
  }

  #restart() {
    this.model.resetState();
    BaseInput.clear(this.$inputAttempt);
    BaseInput.clear(this.$inputCarPlayerName);
  }
}
