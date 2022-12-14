import { Component } from './component.js';
import { NumberUtil } from '../utils/number.util.js';
import { RacingRule } from '../common/enum.js';

export class RacingComponent extends Component {
  #playerState;
  #roundState;
  $racingWrap = '.racing-wrap';
  $carList = '.car-list';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#roundState.observers = [...this.#roundState.observers, this.init];
  }

  init = () => {
    this.#setTemplate();
    this.render(this.$carList);
    this.show(this.$racingWrap);
    this.#startRace();
  };

  #setTemplate() {
    this.template = this.#playerState.player.map((player) => (`<div class="mr-2"><div class="car-player">${player}</div></div>`)).join('');
  }

  #startRace() {
    for (let i = 0; i < this.#roundState.round; i += 1) {
      this.#playerState.player.forEach((player, index) => {
        if (RacingRule.MOVEMENT_CONDITION <= NumberUtil.randomNumber()) {
          this.#renderForward(index);
        }
      });
    }
  }

  #renderForward(index) {
    const template = '<div class="forward-icon mt-2">⬇️️</div>';
    this.insertHTML(`${this.$carList} > div:nth-child(${index + 1})`, template);
  }
}
