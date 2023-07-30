import Racer from './racer.js';
import { print } from './utils/common.util.js';
import { readline } from './utils/readline.util.js';

const racer = new Racer();

class RacingCar {
  #CAR_NAME_LENGTH_LIMIT = 5;
  ERROR_EXIT_MESSAGE = '잘못된 입력 값으로 프로그램을 종료합니다.';
  ERROR_WRONG_INPUT_MESSAGE = '잘못된 입력 값입니다. 다시 입력해주세요!';

  count;
  racers;
  winners;

  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.racers = [];
    this.winners = [];
  }

  start() {
    readline.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      (names) => {
        if (!this.validateCarInput(names)) {
          this.printWrongInput();
          return this.start();
        }

        readline.question('시도할 횟수는 몇회인가요?\n', (count) => {
          if (!this.validateCountInput(count)) {
            this.printWrongInput();
            return this.start();
          }

          this.setCount(count);

          this.printTitle();

          this.setRacers(names);

          this.race(this.racers);
          this.printWinners();

          readline.close();
        });
      }
    );
  }

  validateCarInput(names) {
    const isValidated = names
      .split(',')
      .every((name) => name.length <= this.#CAR_NAME_LENGTH_LIMIT);

    return isValidated;
  }

  validateCountInput(count) {
    const isValidated = !Number.isNaN(parseInt(count));

    return isValidated;
  }

  race(racers) {
    for (let i = 0; i < this.count; i += 1) {
      racers.forEach((r) => {
        racer.goForward(r);
        racer.printRacingState(r.name, r.state);
      });
      print('');
    }

    this.setWinners(racers);
  }

  setCount(count) {
    this.count = count;
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

  setWinners(racers) {
    const maxGos = Math.max(...racers.map((racer) => racer.state.length));
    racers.forEach((racer) => {
      if (racer.state.length === maxGos) {
        this.winners.push(racer.name);
      }
    });
  }

  getWinners() {
    return this.winners.join(', ');
  }

  printTitle() {
    print('');
    print('실행결과');
  }

  printWinners() {
    print(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  printWrongInput() {
    print('');
    print(this.ERROR_WRONG_INPUT_MESSAGE);
    print('');
  }

  exit() {
    throw new Error(this.ERROR_EXIT_MESSAGE);
  }
}

export default RacingCar;
