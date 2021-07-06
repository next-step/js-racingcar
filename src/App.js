import Component from './core/Component.js';
import State from './core/State.js';
import GameFormSection from './components/GameFormSection.js';
import { $, delay } from './utils/utils.js';
import GameSection from './components/GameSection.js';
import GameResult from './components/GameResult.js';

export default class App extends Component {
  setState() {
    this.cars = new State([]);
    this.raceCount = new State(0);
    this.winner = '';
  }

  mount() {
    this.$target.innerHTML = `
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <section id="game-form-section" class="d-flex justify-center mt-5"></section>
      <section id="game-section" class="d-flex justify-center mt-5"></section>
      <section id="result-section" class="d-flex justify-center mt-5"></section>
    `;
  }

  mountChildren() {
    new GameFormSection($('#game-form-section'), {
      cars: this.cars,
      raceCount: this.raceCount,
      gameSection: this.mountGameSection.bind(this),
      race: this.race.bind(this),
    });
  }

  mountGameSection() {
    this.gameSection = new GameSection($('#game-section'), {
      cars: this.cars,
      raceCount: this.raceCount,
    });
  }

  mountGameResultSection() {
    new GameResult($('#result-section'), {
      winner: this.winner,
    });
  }

  async race() {
    this.gameProcess();
  }

  findWinner() {
    const carDistance = this.cars.getState.map((car) => car.distance);
    const maxDistance = Math.max(...carDistance);
    return this.cars.getState
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.carName)
      .join(', ');
  }

  gameProcess() {
    const time = setInterval(() => {
      this.raceCount.setNewState = this.raceCount.getState - 1;
      this.cars.getState.forEach((car) => car.process());
      this.gameSection.render();
      if (this.raceCount.getState === 0) {
        clearInterval(time);
        this.winner = this.findWinner();
        this.mountGameResultSection();
      }
    }, 1000);
  }
}
