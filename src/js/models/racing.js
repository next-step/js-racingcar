import Observable from "./observable.js";

class RacingModel extends Observable {
  state;
  constructor() {
    super();
    this.state = {
      tryCount: 0,
      carNames: [],
      winner: "",
    };
  }
}

export default RacingModel;
