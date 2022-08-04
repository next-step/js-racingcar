import CarPlayer from '../view/CarPlayer.js';
import BaseController from './BaseController.js';

export default class CarPlayerList extends BaseController {
  constructor(state) {
    super(state);
    this.$carPlayerList = document.querySelector('#car-player-list');
  }

  // TODO: STORE 쓰면 불리
  #hasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  // TODO: STORE 쓰면 불리
  #hasAttempt() {
    return !!this.state.attempt;
  }

  render() {
    if (!this.#hasCarPlayerName() || !this.#hasAttempt()) {
      this.$carPlayerList.innerHTML = '';
      return;
    }

    const { carPlayerNames } = this.state;
    const carPlayerList = carPlayerNames.reduce((acc, name) => acc + CarPlayer(name), '');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}
