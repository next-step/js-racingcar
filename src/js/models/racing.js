import Observable from "./observable.js";

const INITIAL_STATE = {
  cars: [],
  winner: [],
  attemptCount: 0,
};

class RacingModel extends Observable {
  state;
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
  }
}

export default RacingModel;
