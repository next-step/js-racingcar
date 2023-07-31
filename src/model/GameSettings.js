import { SETTINGS } from '../constants/index.js';

export class GameSettings {
  maxNameLength;
  minNameLength;
  round;
  randomNumberMax;
  randomNumberMin;
  movement;
  seperator;
  movementCondition;

  constructor() {
    this.maxNameLength = SETTINGS.NAME.MAX_LENGTH;
    this.minNameLength = SETTINGS.NAME.MIN_LENGTH;
    this.round = SETTINGS.ROUND;
    this.randomNumberMax = SETTINGS.RANDOM_NUMBER.MAX;
    this.randomNumberMin = SETTINGS.RANDOM_NUMBER.MIN;
    this.movement = SETTINGS.MOVEMENT;
    this.seperator = SETTINGS.SEPERATOR;
    this.movementCondition = SETTINGS.MOVEMENT_CONDITION;
  }
  // eslint-disable-next-line max-lines-per-function
  getSettings() {
    return {
      maxNameLength: this.maxNameLength,
      minNameLength: this.minNameLength,
      round: this.round,
      randomNumberMax: this.randomNumberMax,
      randomNumberMin: this.randomNumberMin,
      movement: this.movement,
      seperator: this.seperator,
      movementCondition: this.movementCondition,
    };
  }
}
