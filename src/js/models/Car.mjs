import { GAME } from '../constants.js';

class Car {
  name;
  gameResult;

  constructor(name) {
    this.name = name;
    this.gameResult = [];
  }

  get advanceCount() {
    return this.gameResult.filter(oneRoundResult => oneRoundResult === GAME.ADVANCE).length;
  }
}

export default Car;
