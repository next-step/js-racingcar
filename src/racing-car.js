import racer from './racer.js';
import { print } from './utils/common.util.js';
import { readline } from './utils/readline.util.js';

class RacingCar {
  #CAR_NAME_LIMIT = 5;
  #RACE_LOOP_LIMIT = 5;

  count;
  winners;

  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.winners = [];
  }

  start() {
    readline.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      (names) => {
        if (!this.validateInput(names)) {
          this.exit();
        }

        print('');
        print('실행결과');

        racer.setRacers(names);

        this.race(racer.racers);
        this.printWinners();

        readline.close();
      }
    );
  }

  validateInput(names) {
    const isValidated = names
      .split(',')
      .every((name) => name.length <= this.#CAR_NAME_LIMIT);

    return isValidated;
  }

  race(racers) {
    for (let i = 0; i < this.#RACE_LOOP_LIMIT; i += 1) {
      racers.forEach((r) => {
        racer.goForward(r);
        racer.printRacingState(r.name, r.state);
      });
      print('');
      this.count += 1;
    }

    this.setWinners(racers);
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

  printWinners() {
    print(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  exit() {
    throw new Error('잘못된 입력 값으로 프로그램을 종료합니다.');
  }
}

const racingCar = new RacingCar();

export default racingCar;
