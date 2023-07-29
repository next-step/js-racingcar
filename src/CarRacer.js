import { CarView } from './View.js';
import { SETTING } from './constants/index.js';
import { print } from './util/print.js';
import { randomNumber } from './util/randomNumber.js';
import { validation } from './util/validation.js';
export class CarRacer {
  #names = new Map();
  #round = SETTING.ROUND;
  view;

  constructor() {
    this.view = new CarView();
  }

  set names(input) {
    const names = input.split(',');
    names.forEach((name) => this.#names.set(validation(name.trim()), 0));
    this.raceStart();
  }

  get names() {
    return Array.from(this.#names, ([key]) => key);
  }

  raceStart() {
    this.view.printStart();

    for (let i = 0; i < this.#round; i++) {
      this.#names.forEach((value, key) => this.moveOrNot(value, key));
      print('\n');
    }

    this.raceEnd();
  }

  moveOrNot(value, key) {
    const score = randomNumber() >= 4 ? 1 : 0;
    this.#names.set(key, this.#names.get(key) + score);
    this.view.printScore(key, value + score);
  }

  raceEnd() {
    this.view.printWinner(this.getWinner());
    process.exit(0);
  }

  getWinner() {
    const maxScore = Math.max(...this.#names.values());
    const winner = this.names.filter((name) => this.#names.get(name) === maxScore);
    return winner;
  }
}
