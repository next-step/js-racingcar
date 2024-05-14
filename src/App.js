import Racing from './domain/Racing';
import {
  readCarProgress,
  writeNumber,
  readWinners,
  writeRacingCar,
} from './view/RacingIO';
import { readLineAsync } from './utils';

async function App() {
  try {
    const racingCarNames = await readLineAsync(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n'
    );
    const racingLapCount = await readLineAsync('시도할 회수는 몇회인가요?\n');

    const racing = new Racing(writeNumber(racingLapCount));
    racing.players = writeRacingCar(racingCarNames);

    console.log('\n실행 결과');
    while (!racing.isEndedRace()) {
      racing.race1Lap();

      for (const car of racing.players) {
        console.log(readCarProgress(car));
      }
      console.log('\n');
    }

    racing.end();
    const winners = racing.getWinnersName();

    console.log(`${readWinners(winners)}가 최종 우승했습니다.`);
  } catch (e) {
    console.error(e + '\n');
    await App();
  }
}

export default App;
