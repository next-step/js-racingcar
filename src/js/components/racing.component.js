import { Component } from './component.js';
import { NumberUtil } from '../utils/number.util.js';
import { RacingRule } from '../common/enum.js';

export default class RacingComponent extends Component {
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
    const race = setInterval(this.#movePlayer, 1000);

    this.#startLoading();

    setTimeout(() => {
      clearInterval(race);
      this.#finishLoading();
    }, this.#roundState.round * 1000);
  }

  #startLoading() {
    this.#playerState.player.forEach((player, index) => {
      this.#renderSpinner(index);
    });
  }

  #finishLoading() {
    this.#playerState.player.forEach((player, index) => {
      this.#removeSpinner(index);
    });
  }

  #movePlayer = () => {
    this.#playerState.player.forEach((player, index) => {
      this.#removeSpinner(index);
      if (RacingRule.MOVEMENT_CONDITION <= NumberUtil.randomNumber()) {
        this.#renderForward(index);
      }
      this.#renderSpinner(index);
    });
  };

  #renderSpinner(index) {
    const template = '<div class="relative spinner-container mt-3"><span class="material spinner"></span></div>';
    this.insertHTML(`${this.$carList} > div:nth-child(${index + 1})`, template);
  }

  #removeSpinner(index) {
    this.removeHTML(`${this.$carList} > div:nth-child(${index + 1}) .spinner-container`);
  }

  #renderForward(index) {
    const template = '<div class="forward-icon mt-2">⬇️️</div>';
    this.insertHTML(`${this.$carList} > div:nth-child(${index + 1})`, template);
  }
}
