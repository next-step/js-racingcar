import Racing from './domain/Racing';
import {
  readCarProgress,
  writeNumber,
  readWinners,
  writeRacingCar,
} from './view/RacingIO';
import { readLineAsync } from './utils';

async function App() {
  let [isInValidNames, isInValidLapCount] = [true, true];
  const racing = new Racing();

  while (isInValidNames) {
    try {
      const carNames = await readLineAsync(
        '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n'
      );
      racing.players = writeRacingCar(carNames);

      isInValidNames = false;
    } catch (e) {
      console.log(e.message + '\n');
    }
  }

  while (isInValidLapCount) {
    try {
      const racingLapCount = await readLineAsync('시도할 회수는 몇회인가요?\n');
      racing.maxLap = writeNumber(racingLapCount);

      isInValidLapCount = false;
    } catch (e) {
      console.log(e.message + '\n');
    }
  }

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
}

export default App;
