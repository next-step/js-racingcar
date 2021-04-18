import { $ } from './utils/dom.js';
import { Input } from './Input.js';
import { Cars } from './Cars.js';

export class Game {
  constructor() {
    this.winnerSection = $('#section-winner');
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
    this.winnerSection.innerHTML = '';
    this.Input.reset();
    this.Cars.reset();
  }

  handleRaceEnd(cars) {
    const winners = Game.findWinners(cars);
    this.showWinner(winners);
  }

  showWinner(winners) {
    const winnerNames = winners.map(({ name }) => name).join(', ');
    this.winnerSection.innerHTML = `
    <div>
        <h2>🏆 최종 우승자: ${winnerNames} 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" id="restart" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `;
  }

  static findWinners(cars) {
    const maxMove = cars.reduce((max, { moves }) => (moves > max ? moves : max), 0);
    return cars.filter(({ moves }) => moves === maxMove);
  }
}
