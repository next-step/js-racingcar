import { ERROR_MESSAGE } from '../constants/errorMessage';
import { getStringFromArray } from '../utils/common';
import CarRaceView from '../view/View';
import Car from './car';

export default class CarRace {
  #participants;
  #winners;
  #lapCount = 0;

  constructor(participants) {
    this.#participants = participants;
  }

  get participants() {
    return this.#participants;
  }

  get participantNames() {
    return this.getCarNames(this.#participants);
  }

  get winners() {
    if (!this.#participants || !this.isRaceStart()) {
      return;
    }

    const sortedParticipants = [
      ...this.#participants.sort((car1, car2) => car2.distance - car1.distance),
    ];

    this.#winners = sortedParticipants.filter(
      (car) => sortedParticipants[0].distance === car.distance
    );

    return this.#winners;
  }

  get winnerNames() {
    return this.getCarNames(this.winners);
  }

  get lapCount() {
    return this.#lapCount;
  }

  set lapCount(lapCount) {
    if (lapCount < 1) {
      throw new Error(ERROR_MESSAGE.CAR_RACE_LAP_COUNT);
    }

    this.#lapCount = Math.round(parseInt(lapCount, 10));
  }

  getCarNames(cars) {
    if (!cars || !cars.length) {
      throw new Error('자동차 이름을 조회할 자동차가 없습니다.');
    }
    const names = cars.map((car) => car.name);
    return getStringFromArray(names);
  }

  isRaceStart() {
    let result = false;

    for (const participant of this.#participants) {
      if (participant.distance > 0) {
        result = true;
        break;
      }
    }

    return result;
  }

  addParticipants(newParticipants) {
    if (!this.#participants) {
      this.#participants = newParticipants;
      return;
    }

    this.#participants = [...this.#participants, newParticipants];
  }
}
