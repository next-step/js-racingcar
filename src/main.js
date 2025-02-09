import { getCarName } from './input.js';
import Race from './domain/Race.js';
import Car from './domain/Car.js';

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
  const names = await getCarName();

  console.log('\n실행 결과');

  const cars = names.map((name) => new Car(name));
  const results = new Race(cars).start();

  const formattedResult = formatRaceResults(results);
  formattedResult.forEach((message) => console.log(message));

  console.log('경주를 완료했습니다');
}

play();
