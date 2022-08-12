import { requestIntervalAnimationFrame } from '../utils/index.js';
import BaseController from './BaseController.js';

const GO_FORWARD_CONDITION_NUMBER = 4;
const MAX_RANDOM_NUMBER = 9;
const MIN_RANDOM_NUMBER = 1;
const INTERVAL = 1000;

export default class Racing extends BaseController {
  #startRacingSteps() {
    const racingSteps = this.model.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [false];
      return acc;
    }, {});

    this.#setRacingSteps(racingSteps);
  }

  #setWinner() {
    const stepCountList = this.model.state.carPlayerNames.map(
      name => this.model.getRacingStepByName(name).length
    );
    const maxStepCount = Math.max(...stepCountList);

    const winners = this.model.state.carPlayerNames.filter(
      name => this.model.getRacingStepByName(name).length === maxStepCount
    );

    this.setState('winners', winners);
  }

  startRacing() {
    this.#startRacingSteps();
    this.#race();
  }

  #endRacing() {
    this.model.state.carPlayerNames.forEach(name => {
      this.model.getRacingStepByName(name).pop();
    });

    this.#setRacingSteps({ ...this.model.state.racingSteps });
  }

  #forwardStep() {
    this.model.state.carPlayerNames.forEach(name => {
      const racingStep = this.model.getRacingStepByName(name);
      const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER + MIN_RANDOM_NUMBER);
      const isGoForward = random >= GO_FORWARD_CONDITION_NUMBER;

      if (isGoForward) {
        this.model.state.racingSteps[name] = [...racingStep.slice(0, -1), true, false];
      }
    });

    this.#setRacingSteps({ ...this.model.state.racingSteps });
  }

  #setRacingSteps(racingSteps) {
    this.setState('racingSteps', racingSteps);
  }

  #forwardInterval() {
    let remainAttemp = this.model.state.attempt;

    return new Promise(resolve => {
      const time = setInterval(() => {
        this.#forwardStep();
        remainAttemp -= 1;

        if (remainAttemp === 0) {
          clearInterval(time);
          resolve();
        }
      }, INTERVAL);
    });
  }

  async #race() {
    await this.#forwardInterval();

    this.#endRacing();
    this.#setWinner();
  }
}
