import Observable from "./observable.js";

class RacingModel extends Observable {
  state;
  constructor() {
    super();
    this.state = {
      cars: [],
      attemptCount: 0,
      winner: "",
    };
  }
}

export default RacingModel;
