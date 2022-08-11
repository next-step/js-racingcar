import BaseModel from './BaseModel.js';

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
}

const model = new Model(state);

export default model;
