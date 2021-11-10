import CarContainer from './Component/CarContainer.js';
import { store } from './modules/store.js';

class App {
  constructor($target) {
    this.$target = $target;
    store.subscribe(() => {
      new CarContainer(this.$target, null, store);
    });

    this.initStore();
  }

  initStore() {
    store.dispatch('');
  }
}

export default App;
