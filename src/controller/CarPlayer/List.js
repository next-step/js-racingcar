import CarPlayer from '../../view/CarPlayer.js';
import BaseController from '../BaseController.js';

export default class CarPlayerList extends BaseController {
  constructor(app) {
    super(app);
    this.$carPlayerList = document.querySelector('#car-player-list');
  }

  #getHasCarPlayerName() {
    return this.app.state.carPlayerNames.length > 0;
  }

  #getHasAttempt() {
    return !!this.app.state.attempt;
  }

  render() {
    if (!this.#getHasCarPlayerName() || !this.#getHasAttempt()) {
      this.$carPlayerList.innerHTML = '';
      return;
    }

    const { carPlayerNames, racingSteps } = this.app.state;
    const carPlayerList = carPlayerNames
      .map(name => CarPlayer(name, racingSteps[name] || []))
      .join('');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}
