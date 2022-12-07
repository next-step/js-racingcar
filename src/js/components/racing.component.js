import { Component } from './component.js';
import { NumberUtil } from '../utils/number.util.js';

export class RacingComponent extends Component {
  $racingWrap = '.racing-wrap';
  $carList = '.car-list';
  #players;

  constructor(services) {
    super(services);

    this.roundState.observers = [...this.roundState.observers, this.init];
  }

  init = () => {
    this.#players = this.playerState.player;

    this.#setTemplate();
    this.render(this.$carList);
    this.show(this.$racingWrap);
    this.#startRace();
  };

  #setTemplate() {
    this.template = this.#players.map((player) => (`<div class="mr-2"><div class="car-player">${player}</div></div>`)).join('');
  }

  #startRace() {
    for (let i = 0; i < this.roundState.round; i += 1) {
      this.#players.forEach((player, index) => {
        if (4 <= NumberUtil.randomNumber()) {
          this.#renderForward(index);
        }
      });
    }
  }

  #renderForward(index) {
    const template = '<div class="forward-icon mt-2">⬇️️</div>';
    this.render(`${this.$carList} > div:nth-child(${index + 1})`, template);
  }
}
