import { Component } from './component.js';
import { NumberUtil } from '../utils/number.util.js';
import { RacingRule } from '../common/enum.js';

export default class RacingComponent extends Component {
  #playerState;
  #roundState;
  #resetState;
  #winnerState;
  $racingWrap = '.racing-wrap';
  $carList = '.car-list';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#resetState = this.services.stateManager.resetState;
    this.#winnerState = this.services.stateManager.winnerState;
    this.#roundState.observers = [...this.#roundState.observers, this.init];
    this.#resetState.observers = [...this.#resetState.observers, this.reset];
  }

  init = () => {
    this.#setTemplate();
    this.render(this.$carList);
    this.show(this.$racingWrap);
    this.#startRace();
  };

  reset = () => {
    this.hide(this.$racingWrap);
    this.removeHTML(`${this.$carList} > *`);
  };

  #setTemplate() {
    this.template = this.#playerState.player.map((player) => (`<div class="mr-2"><div class="car-player">${player}</div></div>`)).join('');
  }

  #startRace() {
    const race = setInterval(this.#movePlayer, 1000);

    this.#startLoading();

    setTimeout(() => this.#finishRace(race), this.#roundState.round * 1000);
  }

  #finishRace(race) {
    clearInterval(race);
    this.#finishLoading();
    this.#checkWinner();
  }

  #startLoading() {
    this.#playerState.player.forEach((player, i) => {
      this.#renderSpinner(i);
    });
  }

  #finishLoading() {
    this.#playerState.player.forEach((player, i) => {
      this.#removeSpinner(i);
    });
  }

  #movePlayer = () => {
    this.#playerState.player.forEach((player, i) => {
      this.#removeSpinner(i);

      if (RacingRule.MOVEMENT_CONDITION <= NumberUtil.randomNumber()) {
        this.#renderForward(i);
      }

      this.#renderSpinner(i);
    });
  };

  #renderSpinner(i) {
    const template = '<div class="relative spinner-container mt-3"><span class="material spinner"></span></div>';
    this.insertHTML(`${this.$carList} > div:nth-child(${i + 1})`, template);
  }

  #removeSpinner(i) {
    this.removeHTML(`${this.$carList} > div:nth-child(${i + 1}) .spinner-container`);
  }

  #renderForward(i) {
    const template = '<div class="forward-icon mt-2">⬇️️</div>';
    this.insertHTML(`${this.$carList} > div:nth-child(${i + 1})`, template);
  }

  #checkWinner() {
    const movementLength = this.#playerState.player.map((player, i) => this.getChildCount(`${this.$carList} > div:nth-child(${i + 1})`));
    const maxMovement = Math.max(...movementLength);

    if (1 === maxMovement) {
      this.#winnerState.winner = [];

      return;
    }

    this.#winnerState.winner = this.#playerState.player.filter((player, i) => maxMovement === this.getChildCount(`${this.$carList} > div:nth-child(${i + 1})`));
  }
}
