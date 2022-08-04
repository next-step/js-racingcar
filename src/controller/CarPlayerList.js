import CarPlayer from '../view/CarPlayer.js';
import BaseController from './BaseController.js';

export default class CarPlayerList extends BaseController {
  constructor(state) {
    super(state);
    this.$carPlayerList = document.querySelector('#car-player-list');
  }

  // TODO: STORE 쓰면 불리
  #getHasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  // TODO: STORE 쓰면 불리
  #getHasAttempt() {
    return !!this.state.attempt;
  }

  render() {
    if (!this.#getHasCarPlayerName() || !this.#getHasAttempt()) {
      this.$carPlayerList.innerHTML = '';
      return;
    }

    const { carPlayerNames, racingSteps } = this.state;
    const carPlayerList = carPlayerNames
      .map(name => CarPlayer(name, racingSteps[name] || []))
      .join('');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}
