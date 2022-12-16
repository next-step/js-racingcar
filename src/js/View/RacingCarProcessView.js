import View from './View';
import { GAME_STATE } from '../constants';

export default class RacingCarProcessView extends View {
  constructor(target, model) {
    super(target, model);
    this.model.subscribe(this.render.bind(this));
  }

  #getCarTemplate({ name, position }) {
    return String.raw`<div class="mr-2">
    <div class="car-player">${name}</div>
    ${Array.from(
      { length: position },
      () => '<div class="forward-icon mt-2">⬇️️</div>'
    ).join('')}
    
    ${
      this.model.isGameState([GAME_STATE.FINISHED])
        ? ''
        : `<div class="mt-2 d-flex justify-center">
    <div class="relative spinner-container">
    <span class="d-flex material spinner"></span>
    </div>
    </div>`
    }
    </div>
`;
  }

  getTemplate() {
    const carsPosition = this.model.getCarNamesAndPositions();
    if (this.model.isGameState([GAME_STATE.INITIAL, GAME_STATE.READY])) {
      return '';
    }
    return String.raw`<div class="mt-4 d-flex">
    ${carsPosition
      .map((carPosition) => this.#getCarTemplate(carPosition))
      .join('')}
     
</div>`;
  }
}
