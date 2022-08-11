import CarPlayer from '../../view/CarPlayer.js';
import BaseController from '../BaseController.js';

// VIEW
export default class CarPlayerList extends BaseController {
  constructor(app) {
    super(app);
    this.$carPlayerList = document.querySelector('#car-player-list');
  }

  render() {
    if (!this.model.getHasCarPlayerName() || !this.model.getHasAttempt()) {
      this.$carPlayerList.innerHTML = '';
      return;
    }

    const { carPlayerNames, racingSteps } = this.model.state;
    const carPlayerList = carPlayerNames
      .map(name => CarPlayer(name, racingSteps[name] || []))
      .join('');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}
