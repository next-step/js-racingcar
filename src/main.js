import { readLineAsync } from './readline-utils.js';
import Race from './race.js';

async function getCarName() {
  const NAME_MAX_LENGTH = 5;

  const name = await readLineAsync('경주할 자동차 이름을 입력하세요\n');
  const nameArray = name.split(',');

  nameArray.forEach((name) => {
    if (name.length >= NAME_MAX_LENGTH) {
      process.exit();
    }
  });

  return name;
}

function startRace(name) {
  const race = new Race(name);
  const result = race.start();
  return result;
}

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

    const results = startRace(name);
    const formattedResult = formatRaceResults(results);
    formattedResult.forEach((message) => console.log(message));

    console.log('경주를 완료했습니다');
  } catch (error) {
    console.error(error);
  }
}

play();
