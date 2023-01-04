import { freezeObject, validateValueType } from "../../common.js";

export class RaceStore {
  static RACE_STATES = {
    WAIT: 'wait',
    DOING: 'doing',
    DONE: 'done',
  };

  static validateProps({ carStates, raceState, raceCount }) {
    return (
      validateValueType(carStates, 'array')
      && validateValueType(raceState, 'string')
      && validateValueType(raceCount, 'number')
    );
  }

  carStates = [];
  raceState = RaceStore.RACE_STATES.WAIT;
  raceCount = 0;

  constructor({
    carStates,
    raceState,
    raceCount,
  }) {
    this.carStates = carStates;
    this.raceState = raceState;
    this.raceCount = raceCount;

    freezeObject(this);
  }
}
