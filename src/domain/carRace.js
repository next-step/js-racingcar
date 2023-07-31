import { CAR_RACE_LAP_LIMIT } from '../constants';
import { getStringFromArray } from '../utils/common';
import CarRaceView from '../view';

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
    return this.getCarNames(this.#participants);
  }

  get winners() {
    if (!this.#participants || !this.#isRaceStarted) {
      return;
    }

    const sortedParticipants = this.#participants.toSorted(
      (car1, car2) => car2.distance - car1.distance
    );

    this.#winners = sortedParticipants.filter(
      (car) => sortedParticipants[0].distance === car.distance
    );

    return this.#winners;
  }

  get winnerNames() {
    return this.getCarNames(this.winners);
  }

  start(view) {
    if (view) {
      view.welcome();
      view.printMessage('실행결과');
      view.printMessage(this.participantNames);
    }

    for (let i = 0; i < CAR_RACE_LAP_LIMIT; i++) {
      this.#participants.forEach((car) => car.runOneLap());
      view && view.printLapResult(this.#participants);
    }

    this.#isRaceStarted = true;
    view && view.printWinners(this.winnerNames);
  }

  getCarNames(cars) {
    if (!cars || !cars.length) {
      throw new Error('자동차 이름을 조회할 자동차가 없습니다.');
    }
    const names = cars.map((car) => car.name);
    return getStringFromArray(names);
  }
}
