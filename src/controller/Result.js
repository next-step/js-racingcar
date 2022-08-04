import BaseController from './BaseController.js';
import BaseInput from './BaseInput.js';

export default class Result extends BaseController {
  constructor(state) {
    super(state);

    this.$result = document.querySelector('#race-result');
  }

  #getHasRaceWinner() {
    return !!this.state.winners.length;
  }

  // static methods로 사용하묜 좋을듯...?
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

  render() {
    this.#setVisible();
  }
}
