import { RACING_CAR } from '../constants/racingCar.js';
import { moveOrStop, wait } from '../service/racingCar.js';
import { getCarAttemptsCount, hideLoadingStatus, showLoadingStatus } from '../view/racingCar.js';

class Model {
  #carName = '';

  #record = {};

  get carName() {
    return this.#carName.split(',').map((elem) => elem.trim());
  }

  set carName(carName) {
    this.#carName = carName;
  }

  get record() {
    return this.#record;
  }

  async gameStart() {
    const carAttemptsCount = getCarAttemptsCount();

    for (let i = 0; i < carAttemptsCount; i++) {
      showLoadingStatus();

      // eslint-disable-next-line no-await-in-loop
      await wait(RACING_CAR.MOVE_FORWARD_WAITING_TIME);
      hideLoadingStatus();
      const record = moveOrStop(this.carName);

      this.carName.forEach((elem) => {
        this.#record[elem] = !this.#record[elem] ? [record[elem]] : [...this.#record[elem], record[elem]];
      });
    }
  }
}

const model = new Model();

export default model;
