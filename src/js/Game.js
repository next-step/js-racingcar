import { $ } from './utils/dom.js';
import { Input } from './Input.js';
import { Cars } from './Cars.js';

export class Game {
  constructor() {
    this.winnerSection = $('#section-winner');
    this.winnerName = $('#winner-name');
    this.Cars = new Cars({ onRaceEnd: (cars) => this.handleRaceEnd(cars) });
    this.Input = new Input({
      onSubmit: ({ cars, raceTimes }) => {
        this.Cars.setState({ cars, raceTimes });
      },
    });
    this.initEventListner();
  }

  initEventListner() {
    this.winnerSection.addEventListener('click', (event) => {
      if (event.target.id === 'restart') {
        this.restart();
      }
    });
  }

  restart() {
    this.winnerSection.classList.add('hidden');
    this.Input.reset();
    this.Cars.reset();
  }

  handleRaceEnd(cars) {
    const winners = Game.findWinners(cars);
    this.showWinner(winners);
  }

  showWinner(winners) {
    const winnerNames = winners.map(({ name }) => name).join(', ');
    this.winnerSection.classList.remove('hidden');
    this.winnerName.textContent = winnerNames;

    setTimeout(() => alert('축하합니다!'), 2000);
  }

  static findWinners(cars) {
    const maxMove = cars.reduce((max, { moves }) => (moves > max ? moves : max), 0);
    return cars.filter(({ moves }) => moves === maxMove);
  }
}
