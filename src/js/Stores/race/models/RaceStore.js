import { freezeObject, validateValueType } from "../../common.js";
import { RACE_STATES } from '../constants.js';

export class RaceStore {
  static validateProps({ carStates, raceState, raceCount }) {
    return (
      validateValueType(carStates, 'array')
      && validateValueType(raceState, 'string')
      && validateValueType(raceCount, 'number')
    );
  }

  carStates = [];
  raceState = RACE_STATES.WAIT;
  raceCount = 0;

  constructor({
    carStates = [],
    raceState = RACE_STATES.WAIT,
    raceCount = 0,
  }) {
    this.carStates = carStates;
    this.raceState = raceState;
    this.raceCount = raceCount;

    freezeObject(this);
  }
}
