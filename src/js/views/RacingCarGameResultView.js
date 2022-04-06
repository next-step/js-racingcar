import { DOM, GAME } from '../constants.js';

class RacingCarGameResultView {
  constructor(target) {
    this.$target = target;
  }

  renderRacingGameResultTemplate(cars) {
    this.$target.innerHTML = cars
      .map(car => this.carRacingResultTemplate(car.name, car.gameResult))
      .join('');
  }

  carRacingResultTemplate(name, gameResult) {
    return String.raw`
    	<div class="mr-2">
				<div class="car-player">${name}</div>
    	  ${gameResult
          .map(result => (result === GAME.ADVANCE ? this.carAdvanceTemplate() : ''))
          .join('')}
			</div>
  `;
  }

  carAdvanceTemplate() {
    return String.raw`<div class="${DOM.CAR_FORWARD_ICON_CLASS} mt-2">⬇️️</div>`;
  }
}

export default RacingCarGameResultView;
