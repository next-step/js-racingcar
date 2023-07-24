import { RACE_LAP_LIMIT } from '../constants';
import { getStringFromArray } from '../utils/common';

export default class CarRace {
  #participants;
  #winners;
  #isRaceStarted = false;

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

  get winners() {
    if (!this.#participants || !this.#isRaceStarted) {
      return;
    }

    const sortedParticipants = [...this.#participants].sort(
      (car1, car2) => car2.distance - car1.distance
    );

    this.#winners = sortedParticipants.filter(
      (car) => sortedParticipants[0].distance === car.distance
    );

    return this.#winners;
  }

  start() {
    for (let i = 0; i < RACE_LAP_LIMIT; i++) {
      this.#participants.forEach((car) => car.runOneLap());
    }
    this.#isRaceStarted = true;
  }
}
