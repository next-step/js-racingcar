import { getCarName } from './input.js';
import Race from './race.js';

function formatRaceResults(results) {
  let result = [];

  results.forEach((round) => {
    round.forEach(({ name, location }) => {
      result.push(`${name} : ${'-'.repeat(location)}`);
    });

    result.push('');
  });

  return result;
}

async function play() {
  try {
    const name = await getCarName();

    console.log('\n실행 결과');

    const results = new Race(name).start();
    const formattedResult = formatRaceResults(results);
    formattedResult.forEach((message) => console.log(message));

    console.log('경주를 완료했습니다');
  } catch (error) {
    console.error(error);
  }
}

play();
