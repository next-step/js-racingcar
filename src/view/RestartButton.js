import BaseView from './Base/View.js';

export default class ViewRestartButton extends BaseView {
  constructor(app) {
    super(app);
    this.raceController = this.controller.race;

    this.$restartButton = document.querySelector('#btn-restart');
    this.$inputAttempt = document.querySelector('#input-attempt');
    this.$inputCarPlayerName = document.querySelector('#input-car-player-name');

    this.#addRestartButtonEvent();
  }

  #addRestartButtonEvent() {
    this.$restartButton.addEventListener('click', this.#restart.bind(this));
  }

  #restart() {
    this.raceController.resetRace();

    this.$inputAttempt.value = '';
    this.$inputCarPlayerName.value = '';
  }
}
