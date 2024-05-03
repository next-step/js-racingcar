import { Car, MAX_CAR_NAME_LENGTH } from '../domain/Car.js';
import readline from 'readline';

export const ERROR_MESSAGE_COMMA_SEPARTED = '이름 구분은 쉼표(,)로 가능합니다.';

export class CarIO {
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

  validInputLength = (input) => {
    return input.length >= MAX_CAR_NAME_LENGTH;
  };

  validateCommaSeparatedNames = (input) => {
    if (!this.validInputLength(input)) return false;

    if (input.split(',').length <= 1) {
      throw new Error(ERROR_MESSAGE_COMMA_SEPARTED);
    }
  };

  async inputCars() {
    const names = await this.readLineAsync(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분): '
    );
    this.validateCommaSeparatedNames(names);

    return names.split(',').map((name) => new Car(name.trim()));
  }

  showProgressResult(racingProgress) {
    let perRacingResult = '';
    racingProgress.forEach((per_race) => {
      per_race.forEach(
        (result) => (perRacingResult += `${result.name} : ${result.position}\n`)
      );
      console.log(perRacingResult);
      perRacingResult = '';
      console.log(' ');
    });
  }
}
