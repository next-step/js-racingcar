import { Car } from './Car.js';
import MESSAGE from '../constants/message.js';
import CAR_VALIDATION from '../constants/carValidation.js';
import { CarRacingProperty } from './CarRacingProperty.js';

// 매니저: 공통 필드 관리, carList를 통한 우승자 계산
export class CarManager {
  #carList = [];
  #attemptCount;

  constructor(carNames) {
    const carNameArray = carNames.split(',');

    try {
      carNameArray.forEach((car, idx) => {
        this.#carList = [...this.#carList, new Car(carNameArray[idx].trim())];
      });
    } catch (e) {
      alert(e);
      throw e;
    }
  }

  get carList() {
    return this.#carList;
  }
  get attemptCount() {
    return this.#attemptCount;
  }

  set attemptCount(count) {
    if (count < 1) {
      throw MESSAGE.ERROR_ATTEMPT_COUNT_INPUT;
    }
    this.#attemptCount = count;
  }

  attemptForward() {
    return this.#carList.map((car) => {
      const isForward = car.createForwardNumber() >= CAR_VALIDATION.MAX_FORWARD_CONDITION;
      return new CarRacingProperty(car.carName, isForward);
    });
  }
}
