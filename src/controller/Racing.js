import { wait } from '../utils/index.js';
import BaseController from './BaseController.js';

const GO_FORWARD_CONDITION_NUMBER = 4;
const MAX_RANDOM_NUMBER = 9;
const MIN_RANDOM_NUMBER = 1;

export default class Racing extends BaseController {
  #setRacingSteps() {
    const racingSteps = this.model.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [false];
      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  #setWinner() {
    const maxStepCount = this.model.state.carPlayerNames.reduce((max, name) => {
      if (max < this.model.state.racingSteps[name].length) {
        return this.model.state.racingSteps[name].length;
      }
      return max;
    }, 0);

    const winners = this.model.state.carPlayerNames.filter(
      name => this.model.state.racingSteps[name].length === maxStepCount
    );

    this.setState('winners', winners);
  }

  startRacing() {
    this.#setRacingSteps();
    this.#race();
  }

  #endRacing() {
    const racingSteps = this.model.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [...this.model.state.racingSteps[name].slice(0, -1)];
      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  #forwardStep() {
    const racingSteps = this.model.state.carPlayerNames.reduce((acc, name) => {
      const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER + MIN_RANDOM_NUMBER);
      const isGoForward = random >= GO_FORWARD_CONDITION_NUMBER;

      if (isGoForward) {
        acc[name] = [...this.model.state.racingSteps[name].slice(0, -1), true, false];
      } else {
        acc[name] = [...this.model.state.racingSteps[name]];
      }

      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  async #race() {
    const { attempt } = this.model.state;
    const dumy = new Array(Number(attempt)).fill(null);

    for await (const _ of dumy) {
      await wait(1000);
      this.#forwardStep();
    }

    this.#endRacing();
    this.#setWinner();
  }
}
