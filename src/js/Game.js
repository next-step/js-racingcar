import { $ } from './utils/dom.js';
import { Input } from './Input.js';
import { Cars } from './Cars.js';

export class Game {
  constructor() {
    this.Cars = new Cars({ onRaceEnd: Game.handleRaceEnd });
    this.Input = new Input({
      onSubmit: ({ cars, raceTimes }) => {
        this.Cars.setState({ cars, raceTimes });
      },
    });
  }

  restart() {

  }

  static handleRaceEnd(cars) {
    const winners = Game.findWinners(cars);
    Game.showWinner(winners);
  }

  static showWinner(winners) {
    const winnerSection = $('#section-winner');
    const winnerText = $('#section-winner h2');
    winnerSection.classList.remove('hidden');
    const winnerNames = winners.map(({ name }) => name).join(', ');
    winnerText.textContent = `🏆 최종 우승자: ${winnerNames} 🏆`;
  }

  static findWinners(cars) {
    const maxMove = cars.reduce((max, { moves }) => (moves > max ? moves : max), 0);
    return cars.filter(({ moves }) => moves === maxMove);
  }
}
