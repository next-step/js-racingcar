import BaseController from './BaseController.js';
import BaseInput from './BaseInput.js';

export default class Result extends BaseController {
  constructor(app) {
    super(app);

    this.$result = document.querySelector('#race-result');
    this.$restartButton = document.querySelector('#btn-restart');

    this.#addRestartButtonEvent();
  }

  // VIEW
  #visible() {
    this.$result.classList.remove('d-none');
  }

  // VIEW
  #invisible() {
    this.$result.classList.add('d-none');
  }

  // VIEW
  #setVisible() {
    if (this.model.getHasRaceWinner()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  #addRestartButtonEvent() {
    this.$restartButton.addEventListener('click', this.#restart.bind(this));
  }

  #restart() {
    this.model.resetState();
    BaseInput.Clear();
  }

  // VIEW
  render() {
    this.#setVisible();
  }
}
