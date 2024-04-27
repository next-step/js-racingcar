import { Car, MAX_CAR_NAME_LENGTH } from '../domain/Car.js';
import readline from 'readline';

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

  validSplitIsCommma = (input) => {
    if (!this.validInputLength(input)) return false;

    if (input.split(',').length <= 1) {
      throw new Error('이름 구분은 쉼표(,)로 가능합니다.');
    }
  };

  async inputCars() {
    const names = await this.readLineAsync(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분): '
    );
    this.validSplitIsCommma(names);

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
