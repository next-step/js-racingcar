import Store from './store/index.js';
import RacingInput from './view/RacingInput.js';

class App {
  constructor() {
    this.store = new Store();
    this.racingInput = new RacingInput(this.store);
  }

  render() {}
}

export default App;
