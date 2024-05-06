import { Race } from './domain/Race.js';
import { randomValue } from './utils/index.js';
import { CarIO } from './view/CarIO.js';

async function main() {
  const race = new Race();
  const carIO = new CarIO();

  race.racingCars = await carIO.inputCars();
  const result = await carIO.RepeatUntilNumber(10);

  race.startRacing(result, randomValue);
  console.log('race.racingProgress', race.racingProgress);
  console.log('실행결과');
  carIO.showProgressResult(race.racingProgress);
  console.log(`${race.winners} 가 최종 우승했습니다.`);
}

main();
