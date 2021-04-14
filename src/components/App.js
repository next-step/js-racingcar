import Component from '../library/core/Component.js';
import UserInput from './UserInput.js';
import GameProcess from './GameProcess.js';
import GameResult from './GameResult.js';
import { $ } from '../library/utils/dom.js';
import State from '../library/core/State.js';
import { WINNING_MESSAGE } from '../library/constants/alertMessage.js';
import wait from '../library/utils/wait.js';

export default class App extends Component {
  initStates() {
    this.cars = new State([]);
    this.raceTimes = new State(0);
    this.winners = '';
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <div class="d-flex justify-center mt-5">
        <div id="user-input-component"></div>
      </div>
      <div id="game-process-component" class="d-flex justify-center mt-5"></div>
      <div id="game-result-component" class="d-flex justify-center mt-5"></div>
    `;
  }

  mountChildComponents() {
    new UserInput($('#user-input-component'), {
      cars: this.cars,
      raceTimes: this.raceTimes,
      mountGameProcess: this.mountGameProcess.bind(this),
      race: this.race.bind(this),
    });
  }

  mountGameProcess() {
    this.gameProcess = new GameProcess($('#game-process-component'), {
      raceTimes: this.raceTimes,
      cars: this.cars,
    });
  }

  mountGameResult() {
    new GameResult($('#game-result-component'), {
      winners: this.winners,
      reset: this.reset,
    });
  }

  reset = () => {
    this.initStates();
    this.render();
  };


  async race() {
    await this.#processRacing();
    this.winners = this.#getWinners();
    this.mountGameResult();
    setTimeout(() => alert(WINNING_MESSAGE), 2000);
  }

  async #processRacing() {
    while (this.raceTimes.get() > 0) {
      this.raceTimes.set(this.raceTimes.get() - 1);
      await wait(1000);
      this.#process1Turn();
      this.gameProcess.render();
    }
  }

  #process1Turn() {
    this.cars.get().forEach(car => car.process());
  }

  #getWinners() {
    const maxPosition = Math.max(...this.cars.get().map(car => car.position));

    return this.cars
      .get()
      .filter(({ position }) => position === maxPosition)
      .map(({ name }) => name);
  }
}
