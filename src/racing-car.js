import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class RacingCar {
  #CAR_NAME_LIMIT = 5;
  #RACE_LOOP_LIMIT = 5;
  #RANDOM_NUMBER_NOT_EQUAL_MAX_VALUE = 10;
  #CHECK_RANDOM_NUMBER_MIN_VALUE = 4;

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
    rl.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      (names) => {
        this.validateInput(names);

        this.print('');
        this.print('실행결과');

        this.setRacers(names);
        this.race(this.racers);
        this.printWinners();

        rl.close();
      }
    );
  }

  validateInput(names) {
    const isValidated = names
      .split(',')
      .every((name) => name.length <= this.#CAR_NAME_LIMIT);
    if (!isValidated) {
      this.exit();
    }
    return isValidated;
  }

  race(racers) {
    for (let i = 0; i < this.#RACE_LOOP_LIMIT; i += 1) {
      racers.forEach((racer) => {
        const isGo = this.checkGo(this.getRandomNumber());
        if (isGo) {
          racer.state += '-';
        }
        this.print(`${racer.name} : ${racer.state}`);
      });
      this.print('');
      this.count += 1;
    }

    this.setWinners(racers);
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

  getRandomNumber() {
    const randomNumber = Math.floor(
      Math.random() * this.#RANDOM_NUMBER_NOT_EQUAL_MAX_VALUE
    );
    return randomNumber;
  }

  checkGo(randomNumber) {
    return randomNumber >= this.#CHECK_RANDOM_NUMBER_MIN_VALUE;
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
    this.print(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  exit() {
    throw new Error('잘못된 입력 값으로 프로그램을 종료합니다.');
  }

  print(str) {
    console.log(str);
  }
}

const racingCar = new RacingCar();

export default racingCar;
