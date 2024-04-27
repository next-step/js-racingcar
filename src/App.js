import Racing from './domain/Racing';
import {
  readCarProgress,
  readWinners,
  writeRacingCar,
} from './domain/RacingIO';
import { readLineAsync } from './utils';

class App {
  constructor() {
    this.racing = new Racing();
  }
  async execute() {
    try {
      const input = await readLineAsync(
        '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n'
      );
      this.racing.players = writeRacingCar(input);

      console.log('\n실행 결과');
      while (!this.racing.isEndedRace()) {
        this.racing.race1Lap();

        for (const car of this.racing.players) {
          console.log(readCarProgress(car));
        }
        console.log('\n');
      }

      this.racing.end();
      const winners = this.racing.getWinnersName();

      console.log(`${readWinners(winners)}가 최종 우승했습니다.`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
