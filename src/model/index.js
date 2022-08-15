import BaseModel from './BaseModel.js';

const GO_FORWARD_CONDITION_NUMBER = 4;
const MAX_RANDOM_NUMBER = 9;
const MIN_RANDOM_NUMBER = 1;
const INTERVAL = 1000;

const state = {
  carPlayerNames: [],
  racingSteps: {},
  attempt: 0,
  winners: [],
};

class Model extends BaseModel {
  getHasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  getHasAttempt() {
    return !!this.state.attempt;
  }

  getHasRaceWinner() {
    return !!this.state.winners.length;
  }

  getRacingStepByName(name) {
    return this.state.racingSteps[name];
  }

  #startRacingSteps() {
    const racingSteps = this.state.carPlayerNames.reduce((acc, name) => {
      acc[name] = [false];
      return acc;
    }, {});

    this.#setRacingSteps(racingSteps);
  }

  #setWinner() {
    const stepCountList = this.state.carPlayerNames.map(
      name => this.getRacingStepByName(name).length
    );
    const maxStepCount = Math.max(...stepCountList);

    const winners = this.state.carPlayerNames.filter(
      name => this.getRacingStepByName(name).length === maxStepCount
    );

    this.setState('winners', winners);
  }

  startRacing() {
    this.#startRacingSteps();
    this.#race();
  }

  #endRacing() {
    this.state.carPlayerNames.forEach(name => {
      this.getRacingStepByName(name).pop();
    });

    this.#setRacingSteps({ ...this.state.racingSteps });
  }

  #forwardStep() {
    this.state.carPlayerNames.forEach(name => {
      const racingStep = this.getRacingStepByName(name);
      const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER + MIN_RANDOM_NUMBER);
      const isGoForward = random >= GO_FORWARD_CONDITION_NUMBER;

      if (isGoForward) {
        this.state.racingSteps[name] = [...racingStep.slice(0, -1), true, false];
      }
    });

    this.#setRacingSteps({ ...this.state.racingSteps });
  }

  #setRacingSteps(racingSteps) {
    this.setState('racingSteps', racingSteps);
  }

  #forwardInterval() {
    let remainAttemp = this.state.attempt;

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

const model = new Model(state);

export default model;
