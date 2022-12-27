import Observable from "./observable.js";

class RacingModel extends Observable {
  state;
  constructor() {
    super();
    this.state = {
      cars: [],
      winner: [],
      attemptCount: 0,
    };
  }
}

export default RacingModel;
