const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

class RacingCar {
  racers = [];
  winners = [];

  init() {
    readline.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      (names) => {
        if (!this.validateInput(names)) {
          this.exit();
        }

        console.log('');
        console.log('실행결과');

        this.setRacers(names);
        this.printWinners();

        readline.close();
      }
    );
  }

  validateInput(names) {
    return names.split(',').every((name) => name.length <= 5);
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

  printWinners() {
    console.log(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  exit() {
    console.log('Error: 잘못된 입력 값으로 프로그램을 종료합니다.');
    readline.close();
  }
}

const racingCar = new RacingCar();
racingCar.init();
