import {MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH, MIN_CAR_AUTOMATIC_NUMBER, START_CAR_POSITION} from '../common.js';

class Car {
  name;
  position = START_CAR_POSITION;

  constructor(name, position = START_CAR_POSITION) {
    if (!this.isValidCarName(name)) {
      throw new Error('자동차 이름은 1자 이상 5자 이하로 문자로 입력해주세요.');
    }
    
    this.name = name;
    this.position = position;
  }

  isValidCarName(car_name) {
    if(typeof car_name !== 'string')
      return false;
    if (car_name.length > MAX_CAR_NAME_LENGTH)
      return false;
    if(car_name.length < MIN_CAR_NAME_LENGTH)
      return false;

    return true;
  }

  init() {
    this.name = '';
    this.position = START_CAR_POSITION;
  }

  move() {
    this.position += 1;
  }

  conditionsMove(number) {
    if(number > MIN_CAR_AUTOMATIC_NUMBER) {
      this.move();
    }
  }

  get name() {
    return this.name;
  }

  get position() {
    return this.position;
  }
}

export default Car;