import CarName from './CarName.js';

class CarNames {
  static #isExistEmptyCarName(carNames) {
    return carNames.some((carName) => CarName.isEmptyCarName(carName));
  }

  static #isExistInvalidCarName(carNames) {
    return carNames.some(
      (carName) => CarName.isValidCarName(carName) === false
    );
  }

  static #notificationEmptyCarName() {
    alert('자동차 이름을 콤마로 구분하여 입력하세요.');
  }

  static #notificationInvalidCarName() {
    alert('1자 이상 5자 이하의 자동차 이름을 입력하세요.');
  }

  static #validateExistEmptyCarName(carNames) {
    if (CarNames.#isExistEmptyCarName(carNames)) {
      CarNames.#notificationEmptyCarName();
      return false;
    }
    return true;
  }

  static #validateExistInvalidCarName(carNames) {
    if (CarNames.#isExistInvalidCarName(carNames)) {
      CarNames.#notificationInvalidCarName();
      return false;
    }
    return true;
  }

  static validate(carNames) {
    return (
      CarNames.#validateExistEmptyCarName(carNames) &&
      CarNames.#validateExistInvalidCarName(carNames)
    );
  }
}
export default CarNames;
