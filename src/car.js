import ValidationError from './shared/validationError.js';

class Car {
  static nameLengthErrorMessage = '자동차의 이름은 1글자 이상 5글자 미만으로 입력하셔야 합니다.';

  static nameTypeErrorMessage = '자동차의 이름은 문자열만 입력 가능합니다.';

  static maxNameSize = 5;

  static minNameSize = 1;

  name = '';

  #location = 0;

  constructor(name) {
    Car.validationName(name);
    this.name = name;
  }

  static validationName(name) {
    if (typeof name !== 'string') {
      throw new ValidationError(Car.nameTypeErrorMessage);
    }
    if (name.length < Car.minNameSize || name.length > Car.maxNameSize) {
      throw new ValidationError(Car.nameLengthErrorMessage);
    }
  }

  moveForward() {
    this.#location += 1;
    console.log(this.getName());
  }

  moveBackward() {
    this.#location -= 1;
  }

  getLocation() {
    return this.#location;
  }

  getName() {
    return this.name;
  }
}

export default Car;
