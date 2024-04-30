import Car from './Car';
import {MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH} from '../common.js';

class InputOutput {
  _car_names;
  _cars = [];

  constructor(car_names) {

    this._car_names = car_names;
    car_names.split(',').forEach(car_name => {
      if (!this.isValidCarName(car_name)) {
        throw new Error('자동차 이름은 1자 이상 5자 이하로 문자로 입력해주세요.');
      }

      this._cars.push(new Car(car_name));
    });
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

  get cars() {
    return this._cars;
  }

  get car_names() {
    return this._car_names;
  }

  get race_output() {
    let result = '';
    this._cars.forEach(car => {
      const position = car.position;
      const car_name = car.name;
      const text_position = '-'.repeat(position);
      result += `${car_name} : ${text_position}\n`;
    });
    return result;
  }

  get winner() {
    let max_position = 0;
    let winners = [];
    this._cars.forEach(car => {
      const position = car.position;
      if(position > max_position) {
        max_position = position;
      }
    })

    this._cars.forEach(car => {
      const position = car.position;
      if(position === max_position) {
        winners.push(car.name);
      }
    })

    return `${winners.join(',')}가 최종 우승했습니다.`;
  }
}

export default InputOutput;