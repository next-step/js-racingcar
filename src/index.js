import Race from './domain/Race.js';
import { readLineAsync } from './utils/readLineAsync.js';

async function play() {
  // Input
  const input = await readLineAsync('자동차 이름을 입력하세요 > ');
  console.log(`자동차 이름은 ${input}입니다.\n`);

  // 경주 시작
  const race = Race.createWithInput(input);
  race.initRace();
}

await play();
