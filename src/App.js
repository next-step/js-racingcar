import Racing from './domain/Racing';
import {
  readCarProgress,
  writeNumber,
  readWinners,
  writeRacingCar,
} from './view/RacingIO';
import { prompt, readLineAsync } from './utils';

async function App() {
  const racing = new Racing();

  const carNames = await prompt(
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
    {
      validate: (value) => {
        if (value.length < 2) {
          throw new Error('최소 2명의 참가자가 필요합니다.');
        }
      },
      format: writeRacingCar,
    }
  );
  racing.players = carNames;

  const racingLapCount = await prompt('시도할 회수는 몇회인가요?\n', {
    validate: (value) => Number.isInteger(value),
    format: writeNumber,
  });
  racing.maxLap = racingLapCount;

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
