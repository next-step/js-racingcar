import Race from './domain/Race.js';
import { printRaceWinners } from './utils/print.js';
import { readLineAsync } from './utils/readLineAsync.js';

async function play() {
  // Input
  const input = await readLineAsync('자동차 이름을 입력하세요 > ');
  console.log(`자동차 이름은 ${input}입니다.`);

  // 경주 준비
  const race = Race.createWithInput(input);

  // 경주 시작
  console.log('\n🏁 자동차 경주를 시작합니다!');
  race.initRace();

  // 우승자 명단 출력
  console.log('\n🎉 우승자는?');
  printRaceWinners(race);
}

await play();
