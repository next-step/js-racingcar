const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

class RacingCar {
  input = '';
  winners = [];

  init() {
    readline.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      (names) => {
        if (!this.validateInput(names)) {
          this.exit();
        }

        this.input = names;
      }
    );
  }

  validateInput(names) {
    return names.split(',').every((name) => name.length <= 5);
  }

  exit() {
    console.log('Error: 잘못된 입력 값으로 프로그램을 종료합니다.');
    readline.close();
  }
}

const racingCar = new RacingCar();
racingCar.init();
