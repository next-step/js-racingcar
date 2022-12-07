import InputPlayerComponent from './components/input-player.component.js';
import InputRoundComponent from './components/input-round.component.js';
import { StateManager } from './services/state-manager.js';

export class App {
  services;

  constructor() {
    this.services = {
      stateManager: new StateManager(),
    };
  }

  start() {
    const inputPlayerComponent = new InputPlayerComponent(this.services);
    const inputRoundComponent = new InputRoundComponent(this.services);
  }
}
