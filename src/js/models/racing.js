import Observable from "./observable.js";

class RacingModel extends Observable {
  constructor() {
    super();
    this.state = super.state;
  }

  reset() {
    super.reset();
  }
}

export default RacingModel;
