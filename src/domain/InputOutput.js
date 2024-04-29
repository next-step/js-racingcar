import Car from './Car';

class InputOutput {
  _car_names;
  _cars = [];

  constructor(car_names) {

    this._car_names = car_names;
    car_names.split(',').forEach(car_name => {
      if (!this.isValid(car_name)) {
        throw new Error('잘못된 입력 값입니다.');
      }

      this._cars.push(new Car(car_name));
    });
  }

  isValid(car_name) {
    if(typeof car_name !== 'string')
      return false;
    if (car_name.length > 5)
      return false;
    if(car_name.length === 0)
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