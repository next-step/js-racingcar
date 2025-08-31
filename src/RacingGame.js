import Car from './Car.js';
import { CONFIG } from './constants/message.js';

export default class RacingGame {
  #car;
  #currentRound;

  constructor(name) {
    this.#car = new Car(name);
  }

  startGame() {
    console.log(this.#car.name + '\n');
    this.#palyRound();

    if (this.#currentRound === CONFIG.RACING_ROUNDS) {
      this.#done();
    }
  }

  #palyRound() {
    for (let i = 1; i <= CONFIG.RACING_ROUNDS; i++) {
      this.#currentRound = i;
      this.#car.moveForward();
      this.#printRoundResult(i);
    }
  }
  #printRoundResult(count) {
    const speed = new Array(count).fill('-').join('');
    console.log(`${this.#car.name}: ${speed}`);
  }

  #done() {
    console.log('\n 경주를 완료했습니다.');
  }
}
