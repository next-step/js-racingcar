import BaseView from '../BaseView.js';

export default class CarPlayerList extends BaseView {
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
      .map(name => carPlayer(name, racingSteps[name] || []))
      .join('');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}

function carPlayerStep(playerStep) {
  if (playerStep) {
    return '<div class="forward-icon mt-2">⬇️️</div>';
  }

  return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `;
}

function carPlayer(player, playerSteps) {
  return `
    <div class="mr-2">
      <div class="car-player">${player}</div>
      ${playerSteps.map(carPlayerStep).join('')}
    </div>
  `;
}
