import BaseController from './BaseController.js';
import BaseInput from './BaseInput.js';

export default class Result extends BaseController {
  constructor(app) {
    super(app);

    this.$result = document.querySelector('#race-result');
    this.$restartButton = document.querySelector('#btn-restart');

    this.#addRestartButtonEvent();
  }

  #getHasRaceWinner() {
    return !!this.app.state.winners.length;
  }

  #visible() {
    this.$result.classList.remove('d-none');
  }

  #invisible() {
    this.$result.classList.add('d-none');
  }

  #setVisible() {
    if (this.#getHasRaceWinner()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  #addRestartButtonEvent() {
    this.$restartButton.addEventListener('click', this.#restart.bind(this));
  }

  #restart() {
    this.app.resetState();
    BaseInput.Clear();
  }

  render() {
    this.#setVisible();
  }
}
