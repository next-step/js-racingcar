import RacingCar from './RacingCar.js';
import store from './store/store.js';
import { $ } from './dom.js';

class App {
  constructor() {
    const $app = $('#app');

    store.subscribe(() => {
      new RacingCar($app);
    });

    this.initStore();
  }

  initStore() {
    store.dispatch('');
  }
}

new App();
