import { Car } from '../domain/Car.js';
import readline from 'readline';

export class CarIO {
  cars;
  inputs;
  constructor() {
    this.cars = [];
    this.inputs = '';
  }

  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  async inputCars() {
    const names = await this.readLineAsync(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분): '
    );
    this.inputs = names;
    this.cars = names.split(',').map((name) => new Car(name.trim()));

    this.cars.forEach((car) => {
      this.checkCarValidate(!car.isValidateName());
    });

    this.checkCarValidate();
  }

  getInputs() {
    return this.inputs;
  }

  getCars() {
    return this.cars;
  }

  showRacingResult(carName, currentPosition) {
    console.log(`${carName} : ${currentPosition}`);
  }

  checkCarValidate() {
    this.cars.forEach((car) => {
      if (!car.isValidateName()) {
        throw new Error('자동차 이름은 5자 이하만 가능합니다.');
      }
    });
  }
}
