import { ERROR_MESSAGE } from '../constants/errorMessage';
import { getStringFromArray } from '../utils/common';
import CarRaceView from '../view/CarRacingView';
import Car from './car';

export default class CarRace {
  #participants;
  #winners;
  #lapCount = 0;
  #carRaceView;

  constructor() {
    this.#carRaceView = new CarRaceView();
    this.#init().then(() => {
      this.start();
    });
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

  #init = async () => {
    while (this.#participants === undefined) {
      await this.#setParticipants();
    }

    while (this.#lapCount < 1) {
      await this.#setCarRaceLap();
    }
    this.#carRaceView.closeInput();
  };

  #setParticipants = async () => {
    try {
      const carNames = await this.#carRaceView.inputCarName();
      if (carNames) {
        this.#participants = carNames.split(',').map((name) => new Car(name));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  #setCarRaceLap = async () => {
    try {
      const lapCount = await this.#carRaceView.inputRaceLapCount();
      if (lapCount) {
        this.lapCount = lapCount;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  start() {
    this.#carRaceView.printMessage('실행결과');
    this.#carRaceView.printMessage(this.participantNames);

    for (let i = 0; i < this.lapCount; i++) {
      this.participants.forEach((car) => car.runOneLap());
      this.#carRaceView.printLapResult(this.participants);
    }

    this.#carRaceView.printWinners(this.winnerNames);
  }
}
