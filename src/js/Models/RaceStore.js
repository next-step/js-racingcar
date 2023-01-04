import { freezeObject, validateValueType } from "./common";

export class RaceStore {
  static RACE_STATES = {
    WAIT: 'wait',
    DOING: 'doing',
    DONE: 'done',
  };

  carStates = [];
  raceState = RaceStore.RACE_STATES.WAIT;
  raceCount = 0;

  constructor({
    carStates,
    raceState,
    raceCount,
  }) {
    this.carStates = validateValueType(carStates, 'array', { undefinedAble: true });
    this.raceState = validateValueType(raceState, 'string', { undefinedAble: true });
    this.raceCount = validateValueType(raceCount, 'number', { undefinedAble: true });

    freezeObject(this);
  }
}
