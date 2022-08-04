import BaseController from './BaseController.js';

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default class Racing extends BaseController {
  #setRacingSteps() {
    const racingSteps = this.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [false];
      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  #setWinner() {
    const maxStepCount = this.state.carPlayerNames.reduce((max, name) => {
      if (max < this.state.racingSteps[name].length) return this.state.racingSteps[name].length;
      return max;
    }, 0);

    const winners = this.state.carPlayerNames.filter(
      name => this.state.racingSteps[name].length === maxStepCount,
    );

    this.setState('winners', winners);
  }

  startRacing() {
    this.#setRacingSteps();
    this.#race();
  }

  #endRacing() {
    const racingSteps = this.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [...this.state.racingSteps[name].slice(0, -1)];
      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  #forwardStep() {
    const racingSteps = this.state.carPlayerNames.reduce((acc, name) => {
      const random = Math.random() * 10 + 1;
      const isGoForward = random >= 4;

      if (isGoForward) {
        acc[name] = [...this.state.racingSteps[name].slice(0, -1), true, false];
      } else {
        acc[name] = [...this.state.racingSteps[name]];
      }

      return acc;
    }, {});

    this.setState('racingSteps', racingSteps);
  }

  async #race() {
    const MAX_ATTEMPT = this.state.attempt;

    // eslint-disable-next-line no-plusplus
    for (let attempt = 0; attempt < MAX_ATTEMPT; ++attempt) {
      // eslint-disable-next-line no-await-in-loop
      await wait(1000);
      this.#forwardStep();
    }

    this.#endRacing();
    this.#setWinner();
  }
}
