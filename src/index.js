const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class RacingCar {
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
        this.validateInput(names);

        console.log('');
        console.log('실행결과');

        this.setRacers(names);
        this.race(this.racers);
        this.printWinners();

        readline.close();
      }
    );
  }

  validateInput(names) {
    const isValidated = names.split(',').every((name) => name.length <= 5);
    if (!isValidated) {
      this.exit();
    }
    return isValidated;
  }

  race(racers) {
    for (let i = 0; i < 5; i += 1) {
      racers.forEach((racer) => {
        const isGo = this.checkGo(this.getRandomNumber());
        if (isGo) {
          racer.state += '-';
        }
        console.log(`${racer.name} : ${racer.state}`);
      });
      console.log('');
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
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
  }

  checkGo(randomNumber) {
    return randomNumber >= 4;
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
    console.log(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  exit() {
    throw new Error('잘못된 입력 값으로 프로그램을 종료합니다.');
  }
}

const racingCar = new RacingCar();
racingCar.start();
