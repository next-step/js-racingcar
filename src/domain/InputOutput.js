import Car from './Car';
import {MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH} from '../common.js';

class InputOutput {
  #carNames;
  #cars = [];

  constructor(names) {
    this.#carNames = names;
    names.split(',').forEach(name => {
      if (!this.isValidCarName(name)) {
        throw new Error('자동차 이름은 1자 이상 5자 이하로 문자로 입력해주세요.');
      }

      this.#cars.push(new Car(name));
    });
  }

  isValidCarName(name) {
    if(typeof name !== 'string')
      return false;
    if (name.length > MAX_CAR_NAME_LENGTH)
      return false;
    if(name.length < MIN_CAR_NAME_LENGTH)
      return false;

    return true;
  }

  get cars() {
    return this.#cars;
  }

  get carNames() {
    return this.#carNames;
  }

  get raceOutput() {
    const result = this.#cars.map(car => {
      const position = car.position;
      const carName = car.name;
      const textPosition = '-'.repeat(position);
      return `${carName} : ${textPosition}\n`;
    }).join('');

    return result;
  }

  get winner() {
    let maxPosition = 0;
    this.#cars.map(car => {
      if(car.position > maxPosition) {
        maxPosition = car.position;
      }
    })
    const winners = this.#cars.filter(car => car.position === maxPosition).map(car => car.name);
    return `${winners.join(',')}가 최종 우승했습니다.`;
  }
}

export default InputOutput;