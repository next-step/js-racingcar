import { Car, MAX_CAR_NAME_LENGTH } from '../domain/Car.js';
import readline from 'readline';

export const ERROR_MESSAGE_COMMA_SEPARTED = '이름 구분은 쉼표(,)로 가능합니다.';
export const ERROR_MESSAGE_NUMERIC = '입력은 숫자만 가능합니다.';
export const ERROR_MESSAGE_RETRY_LIMIT = '입력 시도가 기준점을 초과했습니다.';

const ERROR_MESSAGE_ACGUMENTS_LENGTH = 'arguments must be 1';
const ERROR_MESSAGE_QUERY_TYPE = 'query must be string';

const CAR_NAME_INPUT_PROMPT =
  '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분): ';

const CAR_RACING_COUNT_INPUT_PROMPT = '시도할 회수는 몇회인가요?';

const NUMERIC_INTEGER = 10;

export class CarIO {
  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error(ERROR_MESSAGE_ACGUMENTS_LENGTH));
      }

      if (typeof query !== 'string') {
        reject(new Error(ERROR_MESSAGE_QUERY_TYPE));
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

  validateCheckNumeric = (input) => {
    return !Number.isNaN(parseInt(input, NUMERIC_INTEGER));
  };

  async inputCars() {
    const names = await this.readLineAsync(CAR_NAME_INPUT_PROMPT);
    this.validateCommaSeparatedNames(names);

    return names.split(',').map((name) => new Car(name.trim()));
  }

  async inputNumberOfRaces() {
    const number = await this.readLineAsync(CAR_RACING_COUNT_INPUT_PROMPT);
    return number;
  }

  async RepeatUntilNumber(retryLimit) {
    let limit = retryLimit;
    while (limit > 0) {
      const result = await this.inputNumberOfRaces();
      if (this.validateCheckNumeric(result)) return Number(result);

      console.log(ERROR_MESSAGE_NUMERIC); // 재시도 메시지 출력
      limit--;
    }

    return -1;
  }

  showProgressResult(racingProgress) {
    let perRacingResult = '';
    racingProgress.forEach(({ round, result }) => {
      result.forEach((car) => (perRacingResult += `${car.name} : ${car.position}\n`));
      console.log(perRacingResult);
      perRacingResult = '';
      console.log(' ');
    });
  }
}
