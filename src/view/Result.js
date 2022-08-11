import BaseView from './BaseView.js';

export default class Result extends BaseView {
  constructor(app) {
    super(app);

    this.$result = document.querySelector('#race-result');
  }

  #visible() {
    this.$result.classList.remove('d-none');
  }

  #invisible() {
    this.$result.classList.add('d-none');
  }

  #setVisible() {
    if (this.model.getHasRaceWinner()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  render() {
    this.#setVisible();
  }
}
