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
        this.race();
        this.printWinners();
        
        readline.close();
      }
    );
  }

  validateInput(names) {
    return names.split(',').every((name) => name.length <= 5);
  }

  race() {
    for (let i = 0; i < 5; i += 1) {
      this.racers.forEach((racer) => {
        const isGo = this.checkGo();
        if (isGo) {
          racer.state += '-';
        }
        console.log(`${racer.name} : ${racer.state}`);
      });
      console.log('');
    }

    this.setWinners();
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

  checkGo() {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber >= 4;
  }

  setWinners() {
    const maxGos = Math.max(...this.racers.map((racer) => racer.state.length));
    this.racers.forEach((racer) => {
      if (racer.state.length === maxGos) {
        this.winners.push(racer.name);
      }
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
