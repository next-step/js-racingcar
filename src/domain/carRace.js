import { RACE_LAP_LIMIT } from '../constants';
import { getStringFromArray } from '../utils/common';

export default class CarRace {
  #participants;
  constructor(participants) {
    this.#participants = participants;
  }

  get participants() {
    return this.#participants;
  }

  get participantNames() {
    const names = this.#participants.map((car) => car.name);
    const result = getStringFromArray(names);
    return result;
  }

  start() {
    for (let i = 0; i < RACE_LAP_LIMIT; i++) {
      this.#participants.forEach((car) => car.runOneLap());
    }
  }
}
