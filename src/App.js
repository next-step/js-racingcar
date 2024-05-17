import Racing from './domain/Racing';
import {
  readCarProgress,
  writeNumber,
  readWinners,
  writeRacingCar,
} from './view/RacingIO';
import { prompt } from './utils';
import ThrowMessage from './utils/ThrowMessage';
import Name from './domain/Name';

async function App() {
  try {
    const racing = new Racing();

    racing.players = await prompt(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      {
        validate: validateCarNames,
        format: writeRacingCar,
      }
    );

    racing.maxLap = await prompt('시도할 회수는 몇회인가요?\n', {
      validate: validateLapCount,
      format: writeNumber,
    });

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
    console.log(e.message);
  }
}

function validateCarNames(value) {
  new ThrowMessage(value).isArray();

  value.forEach((name) => {
    new ThrowMessage(name)
      .isString()
      .regex(Name.DEFAULT_OPTIONS.REGEX)
      .minLength(Name.DEFAULT_OPTIONS.MIN_NAME_LENGTH)
      .maxLength(Name.DEFAULT_OPTIONS.MAX_NAME_LENGTH);
  });
}

function validateLapCount(value) {
  new ThrowMessage(value).min(Racing.MIN_LAP_LIMIT);
}

export default App;
