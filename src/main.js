import { readLineAsync } from './utils/readLineAsync.js';
import { Car } from './models/Car/index.js';

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

function moveCars(cars) {
  cars.forEach((car) => car.move());
}

function printCurrentRound(cars) {
  cars.forEach((car) => {
    const { name, location } = car.information;
    console.log(`${name} : ${'-'.repeat(location)}`);
  });
  linebreak();
}

function getWinners(cars) {
  const maxLocation = Math.max(...cars.map((car) => car.information.location));
  return cars.filter((car) => car.information.location === maxLocation);
}

function printWinners(winners) {
  console.log(
    `${winners
      .map((winner) => winner.information.name)
      .join(', ')}가 최종 우승했습니다.`,
  );
}

function linebreak() {
  console.log();
}
