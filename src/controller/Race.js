import BaseController from './BaseController.js';

export default class ControllerRace extends BaseController {
  constructor(app) {
    super(app);
    this.name = 'race';
  }

  setAttempt(value) {
    this.setState('attempt', value);
  }

  setCarPlayerNames(value) {
    const nameList = value.split(',').map(name => name.trim());
    this.setState('carPlayerNames', nameList);
  }

  starRace(view) {
    view.setAttempt();
    this.model.startRacing();
  }

  resetRace() {
    this.model.resetState();
  }
}
