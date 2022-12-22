import Observable from "./observable.js";

class Racing extends Observable {
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

export default Racing;
