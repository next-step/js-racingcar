import { readLineAsync } from './utils/readLineAsync.js';
import { Car } from './domain/models/Car/index.js';
import { getWinners, moveCars } from './domain/index.js';
import { linebreak, printWinners, printCurrentRound } from './view/index.js';

play();

async function play() {
  const names = await readLineAsync('경주할 자동차 이름을 입력하세요.\n');
  const maxRound = await readLineAsync('시도할 회수는 몇회인가요?\n');

  const cars = names.split(',').map((name) => new Car(name));

  linebreak();
  console.log('실행 결과');
  for (let currentRound = 1; currentRound <= maxRound; currentRound++) {
    moveCars(cars);
    printCurrentRound(cars);
  }

  printWinners(getWinners(cars));
}
